import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useContext } from 'react';

import { Typography, Card, CardContent, TextField, Button } from '@mui/material';

import axios from 'axios';

import Layout from '@/components/Layout';
import AuthenticationContext from '@/context/AuthenticationContext';

export default function LoginPage() {

  const router = useRouter()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthenticationContext)

  const submitHandler = e => {
    e.preventDefault();
    login({ username, password })
  }

  return (
    <>
      <Layout>
        <div>
            <div style={{ marginTop: '70px', textAlign: 'center' }}>
                <Typography variant="h3">Login</Typography>
                <Card>
                    <CardContent>
                        <form onSubmit={submitHandler}>
                            <div style={{ paddingBottom: '10px' }}>
                                <TextField 
                                    label='Username' 
                                    fullWidth
                                    onChange={e => setUserName(e.target.value)}
                                    value={username}
                                />
                            </div>

                            <div style={{ paddingBottom: '10px' }}>
                                <TextField label='Password'
                                    fullWidth
                                    inputProps={{ 'type': 'password' }}
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>

                            <div style={{ paddingBottom: '10px' }}>
                                <Button variant='contained' color='primary' type='submit'>Login</Button>
                            </div>

                            <div>
                                <Link href='account/register'>
                                    Don't have an account? Sign up
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
      </Layout>
      
    </>
  )
}

// export async function getServerSideProps() {
//   // Fetch our Data
//   const { data } = await axios.get("http://127.0.0.1:8000/categories/")

//   return {
//     props: {
//       categories: data.results
//     }
//   }
// }
