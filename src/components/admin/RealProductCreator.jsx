import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { saveRealProduct } from '../../data/realProductData';

const RealProductCreator = () => {
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    emoji: '📦',
    fullName: '',
    path: '',
    visible: true,
    characteristics: '',
    characteristicsTitle: 'Características Principais',
    pricingTable: [],
    pricingTableTitle: 'Tabela de Preços',
    observations: '',
    observationsTitle: 'Observações Importantes',
    aiAgents: []
  });

  const [saving, setSaving] = useState(false);
  const [newTableColumn, setNewTableColumn] = useState('');
  const [newTableRow, setNewTableRow] = useState({});

  const emojis = ['📦', '📞', '🎤', '📡', '🌐', '💻', '🤖', '⚡', '🚀', '💡', '🎯', '🔥', '⭐', '💼', '🛡️', '📊'];

  const generateId = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const updateField = (field, value) => {
    setProductData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-gerar ID e path quando o nome muda
      if (field === 'name') {
        const id = generateId(value);
        updated.id = id;
        updated.path = `/${id}`;
        updated.fullName = `${prev.emoji} ${value}`;
      }
      
      // Atualizar fullName quando emoji muda
      if (field === 'emoji') {
        updated.fullName = `${value} ${prev.name}`;
      }
      
      return updated;
    });
  };

  const addTableColumn = () => {
    if (!newTableColumn.trim()) return;
    
    setProductData(prev => ({
      ...prev,
      pricingTable: prev.pricingTable.map(row => ({
        ...row,
        [newTableColumn]: ''
      }))
    }));
    
    setNewTableColumn('');
  };

  const addTableRow = () => {
    const columns = productData.pricingTable.length > 0 
      ? Object.keys(productData.pricingTable[0]) 
      : [];
    
    const newRow = {};
    columns.forEach(col => {
      newRow[col] = '';
    });
    
    setProductData(prev => ({
      ...prev,
      pricingTable: [...prev.pricingTable, newRow]
    }));
  };

  const updateTableCell = (rowIndex, column, value) => {
    setProductData(prev => ({
      ...prev,
      pricingTable: prev.pricingTable.map((row, index) =>
        index === rowIndex ? { ...row, [column]: value } : row
      )
    }));
  };

  const removeTableRow = (rowIndex) => {
    setProductData(prev => ({
      ...prev,
      pricingTable: prev.pricingTable.filter((_, index) => index !== rowIndex)
    }));
  };

  const removeTableColumn = (columnName) => {
    setProductData(prev => ({
      ...prev,
      pricingTable: prev.pricingTable.map(row => {
        const newRow = { ...row };
        delete newRow[columnName];
        return newRow;
      })
    }));
  };

  const addAiAgent = () => {
    const newAgent = {
      title: 'Novo Agente IA',
      description: 'Descrição do agente especialista',
      url: 'https://chat.openai.com/specialist'
    };
    
    setProductData(prev => ({
      ...prev,
      aiAgents: [...prev.aiAgents, newAgent]
    }));
  };

  const updateAiAgent = (index, field, value) => {
    setProductData(prev => ({
      ...prev,
      aiAgents: prev.aiAgents.map((agent, i) =>
        i === index ? { ...agent, [field]: value } : agent
      )
    }));
  };

  const removeAiAgent = (index) => {
    setProductData(prev => ({
      ...prev,
      aiAgents: prev.aiAgents.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!productData.name.trim()) {
      alert('Por favor, insira o nome do produto');
      return;
    }

    setSaving(true);
    try {
      const success = saveRealProduct(productData);
      if (success) {
        alert(`Produto "${productData.name}" criado com sucesso!\n\nO produto agora está disponível no menu lateral e pode ser acessado em: ${productData.path}`);
        
        // Reset form
        setProductData({
          id: '',
          name: '',
          emoji: '📦',
          fullName: '',
          path: '',
          visible: true,
          characteristics: '',
          characteristicsTitle: 'Características Principais',
          pricingTable: [],
          pricingTableTitle: 'Tabela de Preços',
          observations: '',
          observationsTitle: 'Observações Importantes',
          aiAgents: []
        });
      } else {
        throw new Error('Falha ao salvar produto');
      }
    } catch (error) {
      alert('Erro ao salvar produto: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const columns = productData.pricingTable.length > 0 ? Object.keys(productData.pricingTable[0]) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">🚀 Criar Produto REAL</h2>
          <p className="text-gray-600">
            Crie um produto que realmente funciona - aparece no menu e gera página acessível.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving || !productData.name.trim()}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? 'Salvando...' : 'Salvar e Publicar'}
          </Button>
        </div>
      </div>

      {/* Preview do produto */}
      {productData.name && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{productData.emoji}</span>
              <div>
                <h3 className="font-bold text-green-800">{productData.fullName}</h3>
                <p className="text-sm text-green-600">
                  ID: {productData.id} | Path: {productData.path}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="characteristics">Características</TabsTrigger>
          <TabsTrigger value="pricing">Preços</TabsTrigger>
          <TabsTrigger value="agents">Agentes IA</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📝 Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Produto *</label>
                  <Input
                    value={productData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Ex: Vivo Internet Empresarial"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Emoji</label>
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji) => (
                      <Button
                        key={emoji}
                        variant={productData.emoji === emoji ? "default" : "outline"}
                        className="text-lg h-10 w-10 p-0"
                        onClick={() => updateField('emoji', emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="characteristics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⭐ Características do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título da Seção</label>
                <Input
                  value={productData.characteristicsTitle}
                  onChange={(e) => updateField('characteristicsTitle', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Características</label>
                <Textarea
                  value={productData.characteristics}
                  onChange={(e) => updateField('characteristics', e.target.value)}
                  placeholder="Descreva as principais características do produto..."
                  rows={8}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Observações</label>
                <Input
                  value={productData.observationsTitle}
                  onChange={(e) => updateField('observationsTitle', e.target.value)}
                  placeholder="Título da seção de observações"
                />
                <Textarea
                  value={productData.observations}
                  onChange={(e) => updateField('observations', e.target.value)}
                  placeholder="Informações importantes, condições, etc..."
                  rows={6}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>💰 Tabela de Preços</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={addTableRow} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Linha
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título da Tabela</label>
                <Input
                  value={productData.pricingTableTitle}
                  onChange={(e) => updateField('pricingTableTitle', e.target.value)}
                />
              </div>

              {/* Adicionar coluna */}
              <div className="flex gap-2">
                <Input
                  value={newTableColumn}
                  onChange={(e) => setNewTableColumn(e.target.value)}
                  placeholder="Nome da nova coluna"
                />
                <Button onClick={addTableColumn} variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Coluna
                </Button>
              </div>

              {/* Tabela */}
              {productData.pricingTable.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-purple-600 text-white">
                        {columns.map((column) => (
                          <th key={column} className="border border-purple-500 px-3 py-2 text-left">
                            <div className="flex items-center justify-between">
                              <span>{column}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTableColumn(column)}
                                className="text-white hover:bg-purple-700 h-6 w-6 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </th>
                        ))}
                        <th className="border border-purple-500 px-3 py-2 w-16">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.pricingTable.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          {columns.map((column) => (
                            <td key={column} className="border border-gray-300 px-3 py-2">
                              <Input
                                value={row[column] || ''}
                                onChange={(e) => updateTableCell(rowIndex, column, e.target.value)}
                                className="border-0 bg-transparent"
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTableRow(rowIndex)}
                              className="text-red-600 hover:bg-red-50 h-6 w-6 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>🤖 Agentes IA Especialistas</CardTitle>
                <Button onClick={addAiAgent} variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Agente
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {productData.aiAgents.map((agent, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Agente {index + 1}</h5>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAiAgent(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Título</label>
                          <Input
                            value={agent.title}
                            onChange={(e) => updateAiAgent(index, 'title', e.target.value)}
                            placeholder="Nome do agente especialista"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">URL</label>
                          <Input
                            value={agent.url}
                            onChange={(e) => updateAiAgent(index, 'url', e.target.value)}
                            placeholder="https://chat.openai.com/..."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <Textarea
                          value={agent.description}
                          onChange={(e) => updateAiAgent(index, 'description', e.target.value)}
                          placeholder="Descrição do que o agente pode ajudar"
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {productData.aiAgents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum agente IA adicionado ainda.</p>
                  <p className="text-sm">Clique em "Adicionar Agente" para começar.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealProductCreator;

