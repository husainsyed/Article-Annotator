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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const theme = createTheme();
export default function SignIn() {
    const [count, setCount] = React.useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var getLink = data.get('formLink');

        if (getLink.length !== 0) {
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
        }

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
                            id="formLink"
                            label="Article Link"
                            placeholder='example: nytimes.com/2021/10/15/business...'
                            name="formLink"
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
                            color="secondary"
                            title={count}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title="Copy Link"
                                            onClick={() => { navigator.clipboard.writeText(count) }}>
                                            <IconButton>
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                            value={count}
                            sx={{ mt: 3, mb: 2 }} >
                        </TextField>
                    </Box>
                </Box>
                <br></br>
                <p style={{ textAlignVertical: "center", textAlign: "center" }}> <a href="https://forms.gle/goDKLQxtK2qX7Jp28" target="_blank" rel="noreferrer noopener">Anonymous Survey</a></p>
            </Container>
        </ThemeProvider>
    );
}