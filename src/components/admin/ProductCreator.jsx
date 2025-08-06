import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowUp, ArrowDown, Trash2, Plus, Edit2, Save } from 'lucide-react';
import DynamicTable from './DynamicTable';
import { useProducts } from '../../hooks/useProducts';

const ProductCreator = () => {
  const { createProduct } = useProducts();
  const [productTitle, setProductTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📞');
  const [modules, setModules] = useState([
    {
      id: 'characteristics',
      title: 'Características Principais',
      icon: '⭐',
      type: 'text',
      content: 'Digite o conteúdo para características principais...'
    },
    {
      id: 'pricing',
      title: 'Tabela de Preços',
      icon: '💰',
      type: 'table',
      content: [
        { 'Coluna 1': 'teste', 'Coluna 2': 'esse teste', 'Coluna 3': 'R$44,00' },
        { 'Coluna 1': 'teste 2', 'Coluna 2': 'esse teste 2', 'Coluna 3': 'R$99,99' }
      ]
    },
    {
      id: 'observations',
      title: 'Observações Importantes',
      icon: '📝',
      type: 'text',
      content: 'Digite o conteúdo para observações importantes...'
    }
  ]);
  const [aiAgents, setAiAgents] = useState([]);
  const [saving, setSaving] = useState(false);

  const emojis = ['📞', '🌐', '💻', '📡', '🎤', '📦', '🚀', '⚡', '🔧', '💡', '🎯', '🔥'];

  const moveModule = (index, direction) => {
    const newModules = [...modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newModules.length) {
      [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];
      setModules(newModules);
    }
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const updateModuleTitle = (index, newTitle) => {
    const newModules = [...modules];
    newModules[index].title = newTitle;
    setModules(newModules);
  };

  const updateModuleContent = (index, newContent) => {
    const newModules = [...modules];
    newModules[index].content = newContent;
    setModules(newModules);
  };

  const addAgent = () => {
    const newAgent = {
      id: Date.now().toString(),
      title: 'Nome do agente IA',
      description: 'Descrição do agente IA',
      url: 'https://exemplo.com'
    };
    setAiAgents([...aiAgents, newAgent]);
  };

  const updateAgent = (id, field, value) => {
    setAiAgents(aiAgents.map(agent => 
      agent.id === id ? { ...agent, [field]: value } : agent
    ));
  };

  const removeAgent = (id) => {
    setAiAgents(aiAgents.filter(agent => agent.id !== id));
  };

  const saveAgent = (id) => {
    // Implementar lógica de salvamento individual do agente se necessário
    console.log('Agente salvo:', id);
  };

  const handleSaveProduct = async () => {
    if (!productTitle.trim()) {
      alert('Por favor, digite um título para o produto.');
      return;
    }

    setSaving(true);
    try {
      const productData = {
        name: productTitle,
        emoji: selectedEmoji,
        characteristics: modules.find(m => m.id === 'characteristics')?.content || '',
        characteristics_title: modules.find(m => m.id === 'characteristics')?.title || 'Características Principais',
        pricing_table: modules.find(m => m.id === 'pricing')?.content || [],
        pricing_table_title: modules.find(m => m.id === 'pricing')?.title || 'Tabela de Preços',
        observations: modules.find(m => m.id === 'observations')?.content || '',
        observations_title: modules.find(m => m.id === 'observations')?.title || 'Observações Importantes',
        ai_agents: aiAgents
      };

      await createProduct(productData);
      
      // Reset form
      setProductTitle('');
      setSelectedEmoji('📞');
      setModules([
        {
          id: 'characteristics',
          title: 'Características Principais',
          icon: '⭐',
          type: 'text',
          content: 'Digite o conteúdo para características principais...'
        },
        {
          id: 'pricing',
          title: 'Tabela de Preços',
          icon: '💰',
          type: 'table',
          content: [
            { 'Coluna 1': 'teste', 'Coluna 2': 'esse teste', 'Coluna 3': 'R$44,00' },
            { 'Coluna 1': 'teste 2', 'Coluna 2': 'esse teste 2', 'Coluna 3': 'R$99,99' }
          ]
        },
        {
          id: 'observations',
          title: 'Observações Importantes',
          icon: '📝',
          type: 'text',
          content: 'Digite o conteúdo para observações importantes...'
        }
      ]);
      setAiAgents([]);
      
      alert('Produto criado e publicado com sucesso!');
    } catch (error) {
      alert('Erro ao criar produto: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">➕ Desenvolver Produto</h2>
          <p className="text-gray-600">
            Crie um novo produto do zero com todos os módulos necessários. O produto será automaticamente adicionado ao menu
            lateral e estará disponível para os usuários.
          </p>
        </div>
      </div>

      {/* Campos Iniciais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Título do Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Digite o nome do produto"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emoji do Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant={selectedEmoji === emoji ? "default" : "outline"}
                  className="text-2xl h-12"
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview do produto no menu lateral */}
      {productTitle && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Preview do produto no menu lateral:</p>
            <div className="flex items-center space-x-2 text-lg">
              <span>{selectedEmoji}</span>
              <span className="font-medium">{productTitle}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Este produto aparecerá no menu lateral esquerdo após ser salvo.</p>
          </CardContent>
        </Card>
      )}

      {/* Módulos do Produto */}
      <Card>
        <CardHeader>
          <CardTitle>Módulos do Produto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {modules.map((module, index) => (
            <Card key={module.id} className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{module.icon}</span>
                    <Input
                      value={module.title}
                      onChange={(e) => updateModuleTitle(index, e.target.value)}
                      className="font-medium border-none p-0 h-auto text-lg"
                    />
                    <Edit2 className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveModule(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveModule(index, 'down')}
                      disabled={index === modules.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeModule(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {module.type === 'text' ? (
                  <Textarea
                    placeholder={`Digite o conteúdo para ${module.title.toLowerCase()}...`}
                    value={module.content}
                    onChange={(e) => updateModuleContent(index, e.target.value)}
                    rows={4}
                  />
                ) : module.type === 'table' ? (
                  <div>
                    <h4 className="font-medium mb-2">📊 {module.title}</h4>
                    <DynamicTable
                      data={module.content}
                      onChange={(newData) => updateModuleContent(index, newData)}
                    />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}

          {/* Módulo Agentes IA */}
          <Card className="border-2 border-purple-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🤖</span>
                  <span className="font-medium text-lg">Agentes IA</span>
                  <span className="text-sm text-gray-500">(Opcional)</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addAgent}
                  className="text-purple-600 border-purple-300 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Agente
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Adicione agentes de IA relacionados ao produto.
              </p>
              
              {aiAgents.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Nenhum agente adicionado ainda. Clique em "Adicionar Agente" para começar.
                </p>
              ) : (
                <div className="space-y-4">
                  {aiAgents.map((agent) => (
                    <Card key={agent.id} className="border border-purple-200">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">Título do Agente</h5>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => saveAgent(agent.id)}
                                className="text-green-600 border-green-300 hover:bg-green-50"
                              >
                                <Save className="h-4 w-4 mr-1" />
                                Salvar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeAgent(agent.id)}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Input
                            placeholder="Nome do agente IA"
                            value={agent.title}
                            onChange={(e) => updateAgent(agent.id, 'title', e.target.value)}
                          />
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <Textarea
                              placeholder="Descrição do agente IA"
                              value={agent.description}
                              onChange={(e) => updateAgent(agent.id, 'description', e.target.value)}
                              rows={2}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Link de Acesso</label>
                            <Input
                              placeholder="URL do agente IA"
                              value={agent.url}
                              onChange={(e) => updateAgent(agent.id, 'url', e.target.value)}
                            />
                          </div>
                          
                          {/* Preview do botão */}
                          {agent.title && agent.url && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600 mb-2">Preview do botão:</p>
                              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                🔗 Acessar {agent.title}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Botão de Salvar no Rodapé */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={handleSaveProduct}
            disabled={saving || !productTitle.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-3"
          >
            {saving ? 'Salvando...' : '💾 Salvar e Publicar Produto'}
          </Button>
        </div>
      </div>

      {/* Espaçamento para o botão fixo */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProductCreator;

