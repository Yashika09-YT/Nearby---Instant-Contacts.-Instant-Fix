// import React, { useState, useEffect, useContext } from 'react';
// import { Button, Input, Form, Divider, notification, Checkbox } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   UserOutlined,
//   LockOutlined,
//   GoogleOutlined,
//   FacebookOutlined,
// } from '@ant-design/icons';
// import axios from 'axios';
// import Logo from '../../Layout/Logo';
// import API from '../../api';
// import { getauth, setauth } from '../../utils/auth';
// import { GlobalContext } from '../../Context/GlobalContext';
// import PublicLayout from '../../Layout/PublicLayout';

// function SignIn(props) {
//   const [form] = Form.useForm();
//   const { data, dispatch } = useContext(GlobalContext);
//   const [state, setState] = useState({ loader: false, error: false });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = getauth();
//     axios.get(API.auth, { headers: { 'auth-token': token } }).then((res) => {
//       if (res.data.success === true) {
//         dispatch({ type: 'LOGIN_SUCCESS' });
//         let { isMerchant } = res.data.data;
//         if (!isMerchant) isMerchant = false;

//         dispatch({ type: 'SET_MERCHANT', isMerchant });
//         let path =
//           '/home-services/allCategories?category=all&state=all&city=&name=';
//         if (props.location && props.location.state && props.location.state.data)
//           path =
//             props.location.state.data.pathname +
//             props.location.state.data.search;
//         navigate(path);
//       }
//     });
//   }, []);

//   const login = () => {
//     setState({ ...state, loader: true });
//     const datas = form.getFieldsValue();
//     axios
//       .post(API.login, datas)
//       .then((res) => {
//         if (res.status) {
//           dispatch({ type: 'LOGIN_SUCCESS' });
//           let { isMerchant } = res.data.data;
//           if (!isMerchant) isMerchant = false;

//           dispatch({ type: 'SET_MERCHANT', isMerchant });

//           if (data.categories.length === 0)
//             axios
//               .get(API.categories)
//               .then((res) => {
//                 if (res.data.success) {
//                   dispatch({ type: 'SET_CATEGORIES', payload: res.data.data });
//                 }
//               })
//               .catch((e) => console.log(e));
//           if (data.states.length === 0)
//             axios
//               .get(API.states)
//               .then((res) => {
//                 if (res.data.success) {
//                   dispatch({ type: 'SET_STATES', payload: res.data.data });
//                 }
//               })
//               .catch((e) => console.log(e));
//           if (res.headers.auth) {
//             setauth(res.headers.auth);
//           }
//           setState({ ...state, loader: false });
//           navigate(
//             '/home-services/allCategories?category=all&state=all&city=&name=',
//           );
//         } else {
//           setState({ error: true, loader: false });
//         }
//       })
//       .catch((e) => {
//         setState({ error: true, loader: false });
//       });
//   };
//   useEffect(() => {
//     if (state.error) {
//       notification.open({
//         message: 'Wrong Credentials',
//         type: 'error',
//       });
//       setState({ ...state, error: false });
//     }
//   }, [state.error]);

//   return (
//     <PublicLayout>
//       <div className=' p-8 bg-white rounded-lg shadow-lg text-center'>
//         <div className='flex align-middle justify-center items-center'>
//           <Logo />
//         </div>
//         <h1 className='text-3xl font-bold mt-4'>
//           Welcome back to HomeServices
//         </h1>
//         <p className='text-lg mt-2'>Please log into your account</p>
//         <Form
//           onFinish={login}
//           form={form}
//           layout='vertical'
//           className='space-y-4 mt-6'
//         >
//           <Form.Item
//             name='email'
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter your email',
//               },
//             ]}
//           >
//             <Input prefix={<UserOutlined />} placeholder='Email' size='large' />
//           </Form.Item>
//           <Form.Item
//             name='password'
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter your password',
//               },
//             ]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder='Password'
//               size='large'
//               iconRender={(visible) =>
//                 visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//               }
//             />
//           </Form.Item>
//           <div className='flex justify-between items-center'>
//             <Form.Item name='remember' valuePropName='checked'>
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>
//             <Link to='/forgot-password' className='text-blue-400'>
//               Forgot Password?
//             </Link>
//           </div>
//           <Button
//             htmlType='submit'
//             type='primary'
//             size='large'
//             block
//             loading={state.loader}
//             className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
//           >
//             {state.loader ? 'Logging in...' : 'Login'}
//           </Button>
//         </Form>
//         <Divider className='mt-8'>Or login with</Divider>
//         <div className='flex justify-center space-x-4'>
//           <Button type='default' size='large' icon={<GoogleOutlined />}>
//             Google
//           </Button>
//           <Button type='default' size='large' icon={<FacebookOutlined />}>
//             Facebook
//           </Button>
//         </div>
//         <p className='text-lg mt-8'>
//           Don't Have an Account?{' '}
//           <Link className='text-blue-400' to='/registration'>
//             Register now
//           </Link>
//         </p>
//       </div>
//     </PublicLayout>
//   );
// }

// export default SignIn;

import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Divider, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import axios from 'axios';
import Logo from '../../Layout/Logo';
import API from '../../api';
import { getauth, setauth } from '../../utils/auth';
import { GlobalContext } from '../../Context/GlobalContext';
import PublicLayout from '../../Layout/PublicLayout';

function SignIn() {
  const [form] = Form.useForm();
  const { dispatch } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getauth();
    if (!token) return;
    axios.get(API.auth, { headers: { 'auth-token': token } })
      .then(res => {
        if (res.data.success) {
          dispatch({ type: 'LOGIN_SUCCESS' });
          navigate('/home-services/allCategories?category=all&state=all&city=&name=');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const login = () => {
    const { email, password } = form.getFieldsValue();

    if (!email || !password) {
      notification.error({ message: 'Validation Error', description: 'Email and password are required' });
      return;
    }

    setLoading(true);
    axios.post(API.login, { email, password })
      .then(res => {
        setLoading(false);
        if (res.data.success) {
          dispatch({ type: 'LOGIN_SUCCESS' });
          if (res.headers.auth) setauth(res.headers.auth);
          navigate('/home-services/allCategories?category=all&state=all&city=&name=');
        } else {
          notification.error({ message: 'Login Failed', description: res.data.msg || 'Invalid credentials' });
        }
      })
      .catch(err => {
        setLoading(false);
        notification.error({ message: 'Login Failed', description: err.response?.data?.msg || 'Server error' });
      });
  };

  return (
    <PublicLayout>
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="text-3xl font-bold mt-4">Welcome back to HomeServices</h1>
        <p className="text-lg mt-2">Please log into your account</p>

        <Form form={form} layout="vertical" className="space-y-4 mt-6" onFinish={login}>
          <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/forgot-password" className="text-blue-400">Forgot Password?</Link>
          </div>

          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <Divider>Or login with</Divider>
        <div className="flex justify-center space-x-4">
          <Button icon={<GoogleOutlined />}>Google</Button>
          <Button icon={<FacebookOutlined />}>Facebook</Button>
        </div>

        <p className="mt-8">
          Don't have an account? <Link to="/registration" className="text-blue-400">Register now</Link>
        </p>
      </div>
    </PublicLayout>
  );
}

export default SignIn;
