import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Application } from "../Model/applicationSchema.js";
import { Job } from "../Model/jobSchema.js";
import cloudinary from "cloudinary";

// POST APPLICATION
export const postApplication = catchAsyncErrors(async (req, res) => {
  const { role } = req.user;

  if (role === "Employer") {
    return res.status(400).json({
      success: false,
      message: "Employer not allowed to access this resource.",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Resume File Required!",
    });
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(resume.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Invalid file type. Upload PNG/JPEG/WEBP only.",
    });
  }

  try {
    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );

    if (!cloudinaryResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload Resume to Cloudinary",
      });
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    if (!jobId) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    // Validate required fields
    if (!name || !email || !coverLetter || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
});

// EMPLOYER GET ALL APPLICATIONS
export const employerGetAllApplications = catchAsyncErrors(async (req, res) => {
    const { role } = req.user;

    if (role === "Job Seeker") {
      return res.status(400).json({
        success: false,
        message: "Job Seeker not allowed to access this resource.",
      });
    }

    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });

    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// JOBSEEKER GET ALL APPLICATIONS
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res) => {
    const { role } = req.user;

    if (role === "Employer") {
      return res.status(400).json({
        success: false,
        message: "Employer not allowed to access this resource.",
      });
    }

    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });

    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// JOBSEEKER DELETE APPLICATION
export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res) => {
    const { role } = req.user;

    if (role === "Employer") {
      return res.status(400).json({
        success: false,
        message: "Employer not allowed to access this resource.",
      });
    }

    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found!",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
