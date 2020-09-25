## Project dependencies:
  Create PostgreSQL docker container (run once):\
    `$ docker run --name gostack_postegres -p 5433:5432`

  After the container is created, to run PostgreSQL on docker:\
    `$ docker start gostack_postgres`

  Create MongoDB docker container (run once):\
    `$ docker run --name gostack_mongodb -p 27017:27017 -d -t mongo`

  After the container is created, to run MongoDB on docker:\
    `$ docker start gostack_mongodb`

## TypeORM
Create new migration:\
  ` $ yarn typeorm migration:create -n <name> `\
\
Execute migrations:\
  ` $ yarn typeorm migration:run `\
\
Rollback migrations:\
  ` $ yarn typeorm migration:revert `

# Requisites:

## Recuperação de senha
**Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação da sua senha;
- O usuário deve poder redefinir a sua senha.

**Requisitos Não Funcionais**
- Utilizar Mailtrap para testar envios em desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background).


**Regras de Negócio**
- O link enviado por e-mail para redefinir a senha deve expirar em duas horas;
- O usuário deve confirmar a nova senha antes de redefiní-la.

## Atualização do perfil
**Requisitos Funcionais**
- O usuário deve poder atualizar seu nome, e-mail e senha.

**Requisitos Não Funcionais**

**Regras de Negócio**
- O usuário não pode alterar seu e-mail para um e-mail já existente na base de dados;
- Para atualizar sua senha, o usuário deverá informar a senha antiga;
- Para atualizar sua senha, o usuário deverá confirmar a nova senha.


## Dashboard do prestador de serviços
**Requisitos Funcionais**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**
- Os agendamentos do prestador no dia deverão ser armazenados em cache;
- As notificações do prestador deverão ser armazenadas no MongoDB;
- As notificações do prestador deverão sem enviadas em tempo real utilizando Socket.io.

**Regras de Negócio**
- A notificação deve possuir um status de lida ou não lida.

## Agendamento de serviços
**Requisitos Funcionais**
- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês que possuam horários disponíveis para o prestador de serviços selecionado;
- O usuário deve poder listar os horários disponíveis, de um dia específico, para o prestador de serviços selecionado;
- O usuário deve poder realizar um novo agendamento com o prestador de serviços selecionado.

**Requisitos Não Funcionais**
- A listagem de prestadores deve ser armazenada em cache.

**Regras de Negócio**
- Cada agendamento deve durar 1h;
- Os agendamentos devem estar disponíveis entre 8h e 18h (primeiro às 8h e último às 17h);
- Não pode haver agendamento em horário já ocupado;
- Não pode haver agendamento no passado;
- Não pode ser agendado um serviço para sí mesmo;

