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
