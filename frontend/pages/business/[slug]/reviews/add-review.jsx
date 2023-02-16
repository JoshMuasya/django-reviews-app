import Layout from '@/components/Layout';

import React, { useState } from 'react';
import axios from 'axios';
import { Card, List, ListItem, Select, MenuItem, TextField, ListItemText, Button, Grid, Typography, FormControl, InputLabel } from '@mui/material';

const AddReviewPage = ({ business }) => {

    const [stars, setStars] = useState('3')
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const submitHandler = () => {
        const csrftoken = getCookie('csrftoken');
        
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        }

        const body = {
            title,
            content: comment,
            stars,
            business: business.url
        }

        const res = axios.post('http://localhost:8000/reviews/', body, config)
    }

  return (
    <Layout>
        <div style={{ marginTop: '75px', paddingLeft: '10px', paddingRight: '5px', color: 'white' }}>
            <Typography variant='h3'>Creating a Review For: { business.name }</Typography>
        </div>

        <div>
            <FormControl fullWidth>
                <InputLabel id='stars' style={{ color: 'white' }}>Stars Rating out of 5</InputLabel>
                <Select 
                    labelId='stars'
                    id='starsComponent'
                    label='Stars'
                    InputLabelProps={{ style: { color: 'white' } }}
                    sx={{ input: { color: 'white' } }}
                    onChange={e => setStars(e.target.value)}
                    value={stars}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={1.5}>1.5</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={2.5}>2.5</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={3.5}>3.5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={4.5}>4.5</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    label='Title'
                    InputLabelProps={{ style: { color: 'white' } }}
                    id='titleComponent'
                    sx={{ input: { color: 'white' } }}
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    label='Tell us about your experience here'
                    InputLabelProps={{ style: { color: 'white' } }}
                    id='commentComponent'
                    multiline
                    minRows={4}
                    sx={{ input: { color: 'white' } }}
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                />
            </FormControl>

            <Button variant="contained" color="primary" onClick={submitHandler}>Submit Review</Button>
        </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: {slug} }) {
    // Fetch our Data
    const { data } = await axios.get(`http://127.0.0.1:8000/businesses?slug=${slug}`)

    
  
    return {
      props: {
        business: data.results[0] || null,
      }
    }
  }

export default AddReviewPage