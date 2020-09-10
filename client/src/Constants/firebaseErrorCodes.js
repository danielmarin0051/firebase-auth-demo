const SIGN_IN_ERROR_CODES = {
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password"
}

const SIGN_UP_ERROR_CODES = {
  INVALID_PASSWORD: "auth/invalid-password",
  EMAIL_ALREADY_EXISTS: "auth/email-already-exists"
}

export default {...SIGN_IN_ERROR_CODES, ...SIGN_UP_ERROR_CODES};