# API de Autenticação Apple Broker

Esta API integrada ao Next.js serve como um intermediário para se comunicar com os endpoints de registro e autenticação de uma API externa (`https://backoffice.demo-corretora.com/api/v1`). Ela lida com o encaminhamento de requisições, adição de headers necessários (como o token de registro) e tratamento básico de erros.

## Funcionalidades

*   **Registro de Usuário:** Encaminha solicitações de registro para a API externa.
*   **Login de Usuário:** Encaminha solicitações de login (autenticação externa) para a API externa.
*   **Tratamento de Erros:** Captura erros da API externa e os retorna em um formato JSON padronizado.

## Endpoints da API

### 1. Registro de Usuário

*   **Método:** `POST`
*   **Endpoint:** `/api/register`
*   **Headers da Requisição:**
    *   `Content-Type: application/json`
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "country": "string",
      "password": "string",
      "currency": "string",
      "checked_forgot": true, // Booleano, opcional pela API externa, mas incluído aqui
      "confirmed_country": true, // Booleano, opcional pela API externa, mas incluído aqui
      "ddi": "+55", // String
      "phone": 19998806611, // Número
      "password_confirmation": "string",
      "email": "user@example.com"
    }
    ```
*   **Resposta de Sucesso (2xx):**
    ```json
    {
      "message": "Cadastro realizado com sucesso!",
      "client": "string",
      "token": "string"
    }
    ```
*   **Resposta de Erro (4xx/5xx):**
    *   Erro de validação da API intermediária (campos ausentes, senhas não conferem):
        ```json
        {
          "error": "Mensagem de erro específica",
          "missing": ["campo1", "campo2"] // Se aplicável
        }
        ```
    *   Erro da API externa:
        ```json
        {
          "message": "Erro na comunicação com a API externa.",
          "errorDetails": { ... } // Corpo do erro retornado pela API externa
        }
        ```
    *   Erro de comunicação (timeout, etc.):
        ```json
        {
          "message": "Mensagem de erro de comunicação"
        }
        ```

### 2. Login de Usuário

*   **Método:** `POST`
*   **Endpoint:** `/api/login`
*   **Headers da Requisição:**
    *   `Content-Type: application/json`
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "email": "user@example.com"
    }
    ```
*   **Resposta de Sucesso (2xx):**
    ```json
    {
      "message": "Login efetuado com sucesso",
      "token": "string",
      "user": "string",
      "url_access": "string"
    }
    ```
*   **Resposta de Erro (4xx/5xx):**
    *   Erro de validação da API intermediária (email ausente):
        ```json
        {
          "error": "O campo email é obrigatório"
        }
        ```
    *   Erro da API externa:
        ```json
        {
          "message": "Erro na comunicação com a API externa.",
          "errorDetails": { ... } // Corpo do erro retornado pela API externa
        }
        ```
    *   Erro de comunicação (timeout, etc.):
        ```json
        {
          "message": "Mensagem de erro de comunicação"
        }
        ```

## Implementação

Esta API é implementada usando as API Routes do Next.js (App Router). Os arquivos principais são:

- `app/api/config.ts` - Configurações e constantes da API
- `app/api/register/route.ts` - Rota de registro
- `app/api/login/route.ts` - Rota de login

## Dependências

*   Next.js: Framework React com suporte a API Routes
*   Axios: Cliente HTTP baseado em Promises