import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Auth() {
  const [mode, setMode] = useState('signup');
  const [error, setError] = useState(null);

  const { signup, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    data => {
      setError(null);
      let result;

      mode === 'signup' ? (result = signup(data.email, data.password)) : (result = login(data.email, data.password));

      result.success ? navigate('/') : setError(result.error);
    },
    [mode, signup, login, navigate],
  );

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Login'}</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                {...register('email', { required: 'Email is required' })}
              />
              {errors && <span className="form-error">{errors.email?.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="passsword" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  maxLength: {
                    value: 12,
                    message: 'Password must be at most 12 characters',
                  },
                })}
              />
              {errors && <span className="form-error">{errors.password?.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode === 'signup' ? ' Sign Up' : 'Login'}
            </button>
          </form>

          <div className="auth-switch">
            {mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <span className="auth-link" onClick={() => setMode('login')}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <span className="auth-link" onClick={() => setMode('signup')}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
