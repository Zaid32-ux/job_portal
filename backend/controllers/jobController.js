import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../Model/jobSchema.js";

export const getAllJobs = catchAsyncErrors(async (req, res) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncErrors(async (req, res) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return res.status(400).json({
      success: false,
      message: "Job Seeker not allowed to access this resource.",
    });
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return res.status(400).json({
      success: false,
      message: "Please provide full job details.",
    });
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return res.status(400).json({
      success: false,
      message: "Please either provide fixed salary or ranged salary.",
    });
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return res.status(400).json({
      success: false,
      message: "Cannot Enter Fixed and Ranged Salary together.",
    });
  }

  const postedBy = req.user._id;

  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return res.status(400).json({
      success: false,
      message: "Job Seeker not allowed to access this resource.",
    });
  }

  const myJobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncErrors(async (req, res) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return res.status(400).json({
      success: false,
      message: "Job Seeker not allowed to access this resource.",
    });
  }

  const { id } = req.params;
  let job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "OOPS! Job not found.",
    });
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

export const deleteJob = catchAsyncErrors(async (req, res) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return res.status(400).json({
      success: false,
      message: "Job Seeker not allowed to access this resource.",
    });
  }

  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "OOPS! Job not found.",
    });
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Invalid ID / CastError",
    });
  }
});
