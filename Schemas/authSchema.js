const z = require('zod');

const registerSchema = z.object({
  firstName: z.string({
    required_error: 'firstName is required',
    invalid_type_error: 'firstName should be a string',
  }),
  lastName: z.string({
    required_error: 'lastName is required',
    invalid_type_error: 'lastName should be a string',
  }),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'unapproved email format',
    })
    .email('unapproved email format'),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password should be a string',
    })
    .min(8),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'unapproved email format',
    })
    .email('unapproved email format'),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password should be a string',
    })
    .min(8),
});

module.exports = { registerSchema, loginSchema };
