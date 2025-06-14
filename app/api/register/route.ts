import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { EXTERNAL_API_BASE_URL, REGISTER_TOKEN } from '../config';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    // Validação básica
    const requiredFields = [
      'country', 'password', 'currency', 'ddi', 'phone', 
      'password_confirmation', 'email'
    ];
    const missingFields = requiredFields.filter(field => !(field in userData));

    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: 'Campos obrigatórios ausentes', 
        missing: missingFields 
      }, { status: 400 });
    }

    if (userData.password !== userData.password_confirmation) {
      return NextResponse.json({ error: 'As senhas não conferem' }, { status: 400 });
    }

    console.log(`Enviando requisição de registro para: ${EXTERNAL_API_BASE_URL}/v1/user-register`);
    
    // Converter o campo ddi para um número inteiro
    if (userData.ddi) {
      // Remover qualquer caractere não numérico
      const ddiValue = userData.ddi.replace(/\D/g, '');
      // Converter para número inteiro
      userData.ddi = parseInt(ddiValue, 10);
    }
    
    console.log('Dados de registro após processamento:', userData);
    
    const response = await axios.post(`${EXTERNAL_API_BASE_URL}/v1/user-register`, userData, {
      headers: {
        'token': REGISTER_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Resposta da API externa (Registro):', response.status, response.data);
    return NextResponse.json(response.data, { status: response.status });

  } catch (error: any) {
    console.error('Erro ao chamar API externa (Registro):', 
      error.response ? error.response.data : error.message);
    
    // Tratamento de erros
    if (error.response) {
      // Erro com resposta da API externa
      return NextResponse.json({
        message: 'Erro na comunicação com a API externa.',
        errorDetails: error.response.data
      }, { status: error.response.status || 500 });
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      return NextResponse.json({ 
        message: 'API externa não respondeu (Gateway Timeout).' 
      }, { status: 504 });
    } else {
      // Erro ao configurar a requisição ou outro erro interno
      return NextResponse.json({ 
        message: 'Erro interno no servidor.', 
        error: error.message 
      }, { status: 500 });
    }
  }
}