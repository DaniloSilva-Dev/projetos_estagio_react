import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
export default function CriarTarefa(){
    return(
        <Box
        component="form"
        noValidate
        autoComplete='off'
        sx={{display: 'flex', alignItems:'center'}}
        >
            <TextField 
            label="Escreva e aperte Enter para criar a tarefa"
            variant='outlined'
            sx={{'& > :not(style)' : {m: 1, width: '30rem'} }}
            slotProps={{
                input: {
                    endAdornment:(
                        <InputAdornment position='end'>
                            <IconButton type='submit' color='primary'>
                                <SendIcon/>
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
            />
        </Box>
    );
}