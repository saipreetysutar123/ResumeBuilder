import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

// CREATE FUNCTION TO CREATE A NEW RESUME

export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body,
        });
        res.status(201).json(newResume);
    }
    catch (error) {
        res.status(500).json({message: "Failed to create resume", error: error.message  });
    }
}
    
// GET FUNCTION TO FETCH ALL RESUMES OF A USER
export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({
            updatedAt:- -1
        });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
};

// GET FUNCTION TO GET SINGLE RESUME BY ID
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resume", error: error.message });
    }
};

// UPDATE FUNCTION TO UPDATE RESUME BY ID
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
             _id: req.params.id,
            userId: req.user._id 
        });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or not authorized" });
        }

        // Merge updated resume
        Object.assign(resume, req.body);
        // Save updated resume
        const savedResume = await resume.save();
        res.json(savedResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to update resume", error: error.message });
    } 
};

// DELETE FUNCTION TO DELETE RESUME BY ID
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or not authorized" });
        }

        // Create a upload folder and store the resume there
        const uploadFolder = path.join(process.cwd(), 'uploads');
        // deletd thumnail function
        if(resume.thumnailLink){
            const oldThumnailPath = path.join(uploadFolder, path.basename(resume.thumnailLink));
            if(fs.existsSync(oldThumnailPath)){
                fs.unlinkSync(oldThumnailPath);
            }
        }

        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile = path.join(
                uploadFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if(fs.existsSync(oldProfile)){
                fs.unlinkSync(oldProfile);
            }
        }

        // Delete resume from db
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        if(!deleted){
            return res.status(404).json({message: "Resume not found or not authorized"});
        }
        res.json({message: "Resume deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete resume", error: error.message });
    }               
};