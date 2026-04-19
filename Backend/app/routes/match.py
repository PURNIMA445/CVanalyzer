from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.file_parser import parse_file
from app.services.matcher import get_match_score

router = APIRouter()


@router.post("/match")
async def match(
    job_description: str = Form(...),
    file: UploadFile = File(None),
    resume_text: str = Form(None),
):

    # extract resume
    if file and file.filename:
        file_bytes = await file.read()
        try:
            resume = parse_file(file.filename, file_bytes)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    elif resume_text:
        resume = resume_text.strip()

    else:
        raise HTTPException(status_code=400, detail="Provide file or resume text")

    if not resume:
        raise HTTPException(status_code=400, detail="Empty resume")

 
    # print("JOB:", job_description)

    # get result
    result = get_match_score(resume, job_description)

    return result