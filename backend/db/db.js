import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  img: { type: String, default: 'https://assets.leetcode.com/users/default_avatar.jpg' },
  username: { type: String, unique: true, required: true, maxlength: 50 },
  email: { type: String, unique: true, required: true, maxlength: 100 },
  github: { type: String, default: 'not uploaded', maxlength: 100 },
  linkedin: { type: String, default: 'not uploaded', maxlength: 100 },
  instagram: { type: String, default: 'not uploaded', maxlength: 100 },
  password: { type: String, required: true, maxlength: 255 },
  question_solved: {
    total: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    easy: { type: Number, default: 0 }
  },
  contest_ratings: [{ type: Number }],
  activity_calendar: {
    type: [[Number]],
    default: function() {
      const year = new Date().getFullYear();
      return [
        Array(31).fill(0), // January
        Array(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28).fill(0), // February (leap year check)
        Array(31).fill(0), // March
        Array(30).fill(0), // April
        Array(31).fill(0), // May
        Array(30).fill(0), // June
        Array(31).fill(0), // July
        Array(31).fill(0), // August
        Array(30).fill(0), // September
        Array(31).fill(0), // October
        Array(30).fill(0), // November
        Array(31).fill(0)  // December
      ];
    }
  },
});


const User = mongoose.model('User', userSchema);


const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, maxlength: 100 },
    password: { type: String, required: true, maxlength: 255 },
    contests_created: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }],
    problems_created: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  });

  
  const Admin = mongoose.model('Admin', adminSchema);


const contestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  contestSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
  
  const Contest = mongoose.model('Contest', contestSchema);


  
  const testCaseSchema = new mongoose.Schema({
    input: String,
    expectedOutput: String,
    description: String
});

const problemSchema = new mongoose.Schema({
  problem_no:{type:Number},
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  time_constraint: { type: String, required: true },
  contests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }],
  solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }],
  level:{type:String},
  solved:{type:Boolean , default: false},
    time_constraint: { type: String, required: true },
    testCases: [testCaseSchema],
    distestCases: [testCaseSchema]
});

  

  
  const Problem = mongoose.model('Problem', problemSchema);


  const solutionSchema = new mongoose.Schema({
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    result: { type: String, enum: ['accepted', 'rejected', 'pending'], default: 'pending' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  // Middleware to update the updated_at field on save
  solutionSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
  
const Solution = mongoose.model('Solution', solutionSchema);

export  {Admin,Solution,User,Problem,Contest};



  