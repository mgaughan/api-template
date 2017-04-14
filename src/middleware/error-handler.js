module.exports = function (err, req, res, next) {
  if (err && err.message === '404') {
    err.status = 404
    err.message = 'The endpoint you are looking for does not exist'
  }

  let status = err.status || err.statusCode || 500

  if (status < 400) status = 500

  res.statusCode = status

  let body = {
    status: status
  }

  // show the stacktrace when not in production
  if (process.env.NODE_ENV !== 'production') body.stack = err.stack

  body.message = err.message

  if (err.code) body.code = err.code
  if (err.type) body.type = err.type

  res.status(status).json(body)
}