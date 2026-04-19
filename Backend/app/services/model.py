from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")


def build_job_embeddings(jobs):
    return model.encode(jobs, normalize_embeddings=True)


def get_top_jobs(skills_text, jobs, job_embeddings):
    user_emb = model.encode([skills_text], normalize_embeddings=True)

    scores = cosine_similarity(user_emb, job_embeddings)[0]
    top_idx = np.argsort(scores)[::-1]

    return [
        {"job": jobs[i], "score": round(float(scores[i]), 3)}
        for i in top_idx
    ]