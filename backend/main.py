import os
from fastapi import FastAPI
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

uri = "bolt://db:7687"
user = os.getenv("NEO4J_USER")
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver(uri, auth=(user, password))

@app.get("/")
def read_root():
    return {"status": "Backend is running"}

@app.get("/genre/{genre_name}/artists")
def get_artists_in_genre(genre_name: str):
    try:
        with driver.session(database="neo4j") as session:
            query = """
            MATCH (a:Artist)-[:PERFORMED]->(:Song)-[:BELONGS_TO]->(g:Genre)
            WHERE toLower(g.name) = toLower($name)
            RETURN DISTINCT a.name AS artist
            """
            result = session.run(query, name=genre_name)
            return [record.data() for record in result]
    except Exception as e:
        return {"error": str(e)}

@app.on_event("shutdown")
def shutdown_event():
    driver.close()