export {
  logErrors,
  clientErrorHandler,
  errorHandler
}

// function notFoundError(err, req, res, next) {
//   // const err = new Error()
  
//   err.status = 404;
//   err.message = 'Not found'
//   next(err)
// }
// export default (err, req, res, next) => {
//     const errorType = typeof err
//     let code = 500
//     let msg = { message: "Internal Server Error" }

//     // switch (err.name) {
//     //     case 'UnauthorizedError':
//     //         code = err.status
//     //         msg = undefined
//     //         break
//     //     case 'BadRequestError':
//     //     case 'UnauthorizedAccessError':
//     //     case 'NotFoundError':
//     //         code = err.status
//     //         msg = err.inner
//     //         break
//     //     default:
//     //         break
//     // }

//     return res.status(code).json(msg)
// }

function logErrors(err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).json({ error: 'Something failed' })
  } else {
    next(err)
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  const status = err.status || 500;
  res.status(status).json(err)
}