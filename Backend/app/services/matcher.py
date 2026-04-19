from sklearn.metrics.pairwise import cosine_similarity
from app.services.model import model
import re

STOPWORDS = {
    "and", "or", "for", "with", "using", "the", "a", "an",
    "is", "are", "to", "of", "in", "on",
    "have", "has", "had",
    "manage", "management", "development",
    "developer", "developers",
    "user", "system", "systems",
    "basic", "strong", "experience",
    "responsible", "looking", "join",
    "our", "we", "they"
}


def extract_keywords(text: str) -> set:
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    return {w for w in words if w not in STOPWORDS}


def get_match_score(resume: str, job_description: str) -> dict:

    emb1 = model.encode([resume])
    emb2 = model.encode([job_description])

    score = round(float(cosine_similarity(emb1, emb2)[0][0]) * 100, 1)

    resume_keywords = extract_keywords(resume)
    job_keywords = extract_keywords(job_description)

    matched = resume_keywords & job_keywords
    missing = job_keywords - resume_keywords

    return {
        "score": score,
        "matched_keywords": list(matched),
        "missing_keywords": list(missing),
        "total_job_keywords": len(job_keywords),
        "total_matched": len(matched),
    }