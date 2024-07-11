import express from "express";

export const verifyUserRole = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const appliedPaths = ["/admin/*", "/admin"]; // 검사를 할 경로

  // 검사 경로에 포함되는지 여부 확인
  const isPathMatched = appliedPaths.some((path) => {
    const regexPath = path.replace("*", ".*");
    const regex = new RegExp(`^${regexPath}$`);
    return regex.test(req.path);
  });

  if (isPathMatched) {
    console.log("hi");

    const { role } = req.user;

    if (role.includes("ADMIN")) {
      next();
    } else {
      return res.status(403).json({
        code: "NoAdmin",
        msg: "No Authorized",
      });
    }
  }

  // login 또는 join 경로일 경우 미들웨어를 건너뜁니다.
  return next();
};
