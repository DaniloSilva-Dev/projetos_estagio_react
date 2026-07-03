import {useState} from 'react';
import {Box, TextField, InputAdornment, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send'

export default function CriarTarefa({onAdicionar}){
  const [nomeTarefa, setNomeTarefa] = useState("");

  function onEnviar(evento){
    evento.preventDefault();
    if(!nomeTarefa.trim()) return;

    onAdicionar(nomeTarefa);
    setNomeTarefa("");
  }

    return(
        <Box
        component="form"
        onSubmit={onEnviar}
        noValidate
        autoComplete='off'
        sx={{display: 'flex', alignItems:'center'}}
        >
            <TextField
            label="Escreva e aperte Enter para criar a tarefa"
            id='nomeTarefa'
            variant='outlined'
            value={nomeTarefa}
            onChange={(elemento) => setNomeTarefa(elemento.target.value)}
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
