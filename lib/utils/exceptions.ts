export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message)
  }
}

export class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message)
  }
}

export class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message)
  }
}
