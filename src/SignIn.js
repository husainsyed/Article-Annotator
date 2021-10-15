import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import $ from 'jquery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const theme = createTheme();

export default function SignIn() {

    const [count, setCount] = React.useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var getLink = data.get('email');
        if (!getLink.includes("https") || !getLink.includes("http")) {
            getLink = "https://" + getLink;
        }

        let linkRequest = {
            destination: getLink,
            domain: { fullName: "rebrand.ly" }
        }

        let requestHeaders = {
            "Content-Type": "application/json",
            "apikey": "26610cc5ff0442b69d0429f230e2a055"
        }

        $.ajax({
            url: "https://api.rebrandly.com/v1/links",
            dataType: 'json',
            contentType: 'json',
            type: "post",
            data: JSON.stringify(linkRequest),
            headers: requestHeaders,
            success: (link) => {
                setCount(`https://outline.com/${link.shortUrl}`)
            },
        });
    };

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Annotate any article!
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            color="secondary"
                            margin="normal"
                            required
                            id="email"
                            label="Article Link"
                            name="email"
                            fullWidth
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 4, mb: 2 }}
                        >
                            Process

                        </Button>
                        <TextField
                            label="Output link"
                            id="outlined-read-only-input"
                            color="secondary"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ContentCopyIcon />
                                    </InputAdornment>
                                )

                            }}

                            onClick={() => { navigator.clipboard.writeText(count) }}
                            value={count}
                            sx={{ mt: 3, mb: 2 }} >

                        </TextField>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}