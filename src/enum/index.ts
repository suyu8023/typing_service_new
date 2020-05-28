// 用户权限
export enum EnumUserPerm {
  user = 0,
  teacher = 2,
  admin = 1,
}

// 中间件名
export enum EnumMiddleware {
  authLoggedIn = "authLoggedInMiddleware",
  authTeacher = "authTeacherMiddleware",
  authAdmin = "authAdminMiddleware",
}

// 提交语言
export enum EnumLanguage {
  gcc = "gcc",
  gpp = "g++",
  python = "python",
}

// 提交的总览评测结果
export enum EnumSolutionResult {
  WT = "WT", // Waiting
  JG = "JG", // Judging
  AC = "AC", // Accepted
  PT = "PT", // Partially Unaccepted
  CE = "CE", // Compilation Error
  SE = "SE", // System Error
}

// 测试点评测结果
export enum EnumJudgementResult {
  AC = "AC", // Accepted
  WA = "WA", // Wrong Answer
  PE = "PE", // Presentation Error
  RTE = "RTE", // Run-time Error
  TLE = "TLE", // Time Limit Exceeded
  MLE = "MLE", // Memory Limit Exceeded
  OLE = "OLE", // Output Limit Exceeded
}

// 比赛类型
export enum EnumContestType {
  Public = 1,
  Private = 2,
}

// 比赛模式
export enum EnumContestMode {
  OI = "OI",
  IOI = "IOI",
  ICPC = "ICPC",
}

// 比赛进行状态
export enum EnumContestStatus {
  Pending = "Pending",
  Running = "Running",
  Ended = "Ended",
}

// 比赛登录状态提示
export enum EnumContestSessionPrompt {
  loginGlobal = "loginGlobal",
  enterPassword = "enterPassword",
}

// post 类型
export enum EnumPostType {
  topic = "topic",
  solution = "solution",
}

// 缓存 key
export enum EnumCacheKey {
  problemDetail = "problemDetail_%d",
  contestDetail = "contestDetail_%d",
  contestRanklist = "contestRanklist_%d",
  userDetail = "userDetail_%d",
  setDetail = "setDetail_%d",
  tagList = "tagList",
  postDetail = "postDetail_%d",
}

// 题目 format
export enum EnumProblemFormat {
  md = "md",
  html = "html",
}
