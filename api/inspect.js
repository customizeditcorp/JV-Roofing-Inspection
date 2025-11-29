export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    console.log('Datos recibidos:', formData);
    
    const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/22084974/uk439bq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!zapierResponse.ok) {
      return res.status(500).json({ 
        success: false, 
        error: 'Zapier failed'
      });
    }
    
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
