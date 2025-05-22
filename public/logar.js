 let dados = {}
 async function entrar(){
    const step1 = document.getElementById('step1')
    const step2 = document.getElementById('step2')

    

    if(!step1.classList.contains('hidden')){
        const input1 = document.getElementById('input1').value
        const inputerr = document.getElementById('inputerro')
        dados = {input1}

        if(input1 == ''){
        inputerr.classList.remove('hidden')
    }else{
        

        await fetch('/verificarlogin',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({input1})
        })
        .then(res =>{
        if(res.status === 409){
            
            inputerr.classList.remove('hidden')
            inputerr.textContent = 'Usuario nao encontrado'
        }else if(res.status === 200){
            const botaologin = document.getElementById('botaologin')
            const botaocriarconta = document.getElementById('botaocriarconta')
            
            
            step1.classList.add('hidden')
            step2.classList.remove('hidden')
            botaocriarconta.classList.add('hidden')
            botaologin.textContent = 'Entrar'
        }
    })
    }
    }else{
        
        const inputsenha = document.getElementById('inputsenha').value
        const senhaerr = document.getElementById('senhaerro')

        if(inputsenha == ''){
            senhaerr.classList.remove('hidden')
            senhaerr.textContent = 'Campo obrigatorio'
        }else{

            await fetch('/verificarsenha',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...dados,inputsenha})
            })
            .then(res =>{
                if(res.status === 409){
                    senhaerr.classList.remove('hidden')
                    senhaerr.textContent = 'Senha incorreta'
                }else if(res.status === 200){
                    window.location.href = '/X'
                }
            })
        }
        
    }

 }