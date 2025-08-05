import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown, Trash2, Plus, Edit3, Save, ExternalLink, Bot } from 'lucide-react';
import DynamicTable from './DynamicTable';

const emojiOptions = ['📞', '🎤', '📡', '🌐', '📦', '💻', '🤖', '⚡', '🔧', '📊', '💼', '🎯'];

export default function ProductCreator() {
  const [productTitle, setProductTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📞');
  const [modules, setModules] = useState([
    {
      id: 1,
      type: 'characteristics',
      title: 'Características Principais',
      emoji: '⭐',
      content: ''
    },
    {
      id: 2,
      type: 'pricing',
      title: 'Tabela de Preços',
      emoji: '💰',
      content: []
    },
    {
      id: 3,
      type: 'observations',
      title: 'Observações Importantes',
      emoji: '📝',
      content: ''
    }
  ]);
  const [aiAgents, setAiAgents] = useState([]);
  const [editingTitles, setEditingTitles] = useState({});

  const moveModule = (index, direction) => {
    const newModules = [...modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newModules.length) {
      [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];
      setModules(newModules);
    }
  };

  const removeModule = (index) => {
    if (modules.length <= 1) return; // Manter pelo menos um módulo
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
  };

  const updateModuleTitle = (index, newTitle) => {
    const newModules = [...modules];
    newModules[index].title = newTitle;
    setModules(newModules);
    setEditingTitles(prev => ({ ...prev, [index]: false }));
  };

  const updateModuleContent = (index, content) => {
    const newModules = [...modules];
    newModules[index].content = content;
    setModules(newModules);
  };

  const addAiAgent = () => {
    const newAgent = {
      id: Date.now(),
      title: '',
      description: '',
      url: '',
      saved: false
    };
    setAiAgents([...aiAgents, newAgent]);
  };

  const updateAiAgent = (agentId, field, value) => {
    setAiAgents(prev => 
      prev.map(agent => 
        agent.id === agentId ? { ...agent, [field]: value, saved: false } : agent
      )
    );
  };

  const saveAiAgent = (agentId) => {
    setAiAgents(prev => 
      prev.map(agent => 
        agent.id === agentId ? { ...agent, saved: true } : agent
      )
    );
  };

  const removeAiAgent = (agentId) => {
    setAiAgents(prev => prev.filter(agent => agent.id !== agentId));
  };

  const handleSave = () => {
    if (!productTitle.trim()) {
      alert('Por favor, insira um título para o produto.');
      return;
    }

    // Verificar se há agentes não salvos
    const unsavedAgents = aiAgents.filter(agent => !agent.saved && (agent.title || agent.description || agent.url));
    if (unsavedAgents.length > 0) {
      alert('Há agentes IA não salvos. Por favor, salve todos os agentes antes de publicar o produto.');
      return;
    }

    // Criar ID único para o produto
    const productId = productTitle.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    // Estruturar dados do produto
    const productData = {
      characteristics: modules.find(m => m.type === 'characteristics')?.content || '',
      characteristicsTitle: modules.find(m => m.type === 'characteristics')?.title || 'Características',
      pricingTable: modules.find(m => m.type === 'pricing')?.content || [],
      pricingTableTitle: modules.find(m => m.type === 'pricing')?.title || 'Tabela de Preços',
      observations: modules.find(m => m.type === 'observations')?.content || '',
      observationsTitle: modules.find(m => m.type === 'observations')?.title || 'Observações',
      aiAgents: aiAgents.filter(agent => agent.saved)
    };

    // Salvar dados do produto
    localStorage.setItem(`product-data-${productId}`, JSON.stringify(productData));

    // Adicionar produto à lista de produtos
    const existingProducts = JSON.parse(localStorage.getItem('admin-products') || '{}');
    existingProducts[productId] = `${selectedEmoji} ${productTitle}`;
    localStorage.setItem('admin-products', JSON.stringify(existingProducts));

    // Criar estrutura de página do produto para o site
    const productPageData = {
      id: productId,
      title: productTitle,
      emoji: selectedEmoji,
      fullTitle: `${selectedEmoji} ${productTitle}`,
      characteristics: productData.characteristics,
      characteristicsTitle: productData.characteristicsTitle,
      pricingTable: productData.pricingTable,
      pricingTableTitle: productData.pricingTableTitle,
      observations: productData.observations,
      observationsTitle: productData.observationsTitle,
      aiAgents: productData.aiAgents,
      created: new Date().toISOString(),
      visible: true
    };

    // Salvar dados da página do produto
    localStorage.setItem(`product-page-${productId}`, JSON.stringify(productPageData));

    // Atualizar lista de produtos no menu lateral
    const existingMenuProducts = JSON.parse(localStorage.getItem('menu-products') || '[]');
    const newMenuProduct = {
      id: productId,
      name: productTitle,
      emoji: selectedEmoji,
      fullName: `${selectedEmoji} ${productTitle}`,
      visible: true
    };
    
    // Verificar se o produto já existe na lista
    const existingIndex = existingMenuProducts.findIndex(p => p.id === productId);
    if (existingIndex >= 0) {
      existingMenuProducts[existingIndex] = newMenuProduct;
    } else {
      existingMenuProducts.push(newMenuProduct);
    }
    
    localStorage.setItem('menu-products', JSON.stringify(existingMenuProducts));

    // Limpar formulário
    setProductTitle('');
    setSelectedEmoji('📞');
    setModules([
      {
        id: Date.now() + 1,
        type: 'characteristics',
        title: 'Características Principais',
        emoji: '⭐',
        content: ''
      },
      {
        id: Date.now() + 2,
        type: 'pricing',
        title: 'Tabela de Preços',
        emoji: '💰',
        content: []
      },
      {
        id: Date.now() + 3,
        type: 'observations',
        title: 'Observações Importantes',
        emoji: '📝',
        content: ''
      }
    ]);
    setAiAgents([]);

    alert(`Produto "${productTitle}" criado e publicado com sucesso!\n\nO produto agora está disponível no menu lateral e pode ser acessado pelos usuários.`);
    
    // Recarregar a página para atualizar o menu lateral
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const renderModuleContent = (module, index) => {
    switch (module.type) {
      case 'characteristics':
      case 'observations':
        return (
          <Textarea
            value={module.content}
            onChange={(e) => updateModuleContent(index, e.target.value)}
            placeholder={`Digite o conteúdo para ${module.title.toLowerCase()}...`}
            rows={6}
            className="w-full"
          />
        );
      
      case 'pricing':
        return (
          <DynamicTable
            title={module.title}
            data={module.content}
            onDataChange={(newData) => updateModuleContent(index, newData)}
            onTitleChange={(newTitle) => updateModuleTitle(index, newTitle)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-20"> {/* Espaço extra para o botão fixo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Desenvolver Produto
          </CardTitle>
          <p className="text-muted-foreground">
            Crie um novo produto do zero com todos os módulos necessários. O produto será automaticamente adicionado ao menu lateral e estará disponível para os usuários.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campos Iniciais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product-title">Título do Produto</Label>
              <Input
                id="product-title"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="Digite o nome do produto"
              />
            </div>
            <div>
              <Label htmlFor="product-emoji">Emoji do Produto</Label>
              <Select value={selectedEmoji} onValueChange={setSelectedEmoji}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {emojiOptions.map(emoji => (
                    <SelectItem key={emoji} value={emoji}>
                      {emoji} {emoji}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview do Produto */}
          {productTitle && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Preview do produto no menu lateral:</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedEmoji}</span>
                <span className="font-semibold">{productTitle}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Este produto aparecerá no menu lateral esquerdo após ser salvo.
              </p>
            </div>
          )}

          {/* Módulos Dinâmicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Módulos do Produto</h3>
            
            {modules.map((module, index) => (
              <Card key={module.id} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{module.emoji}</span>
                      {editingTitles[index] ? (
                        <Input
                          value={module.title}
                          onChange={(e) => {
                            const newModules = [...modules];
                            newModules[index].title = e.target.value;
                            setModules(newModules);
                          }}
                          onBlur={() => updateModuleTitle(index, module.title)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              updateModuleTitle(index, module.title);
                            }
                          }}
                          className="text-lg font-semibold"
                          autoFocus
                        />
                      ) : (
                        <h4 
                          className="text-lg font-semibold cursor-pointer hover:text-blue-600 flex items-center gap-2"
                          onClick={() => setEditingTitles(prev => ({ ...prev, [index]: true }))}
                        >
                          {module.title}
                          <Edit3 className="w-4 h-4 opacity-50" />
                        </h4>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveModule(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveModule(index, 'down')}
                        disabled={index === modules.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeModule(index)}
                        disabled={modules.length <= 1}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderModuleContent(module, index)}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Módulo Agentes IA (Opcional) */}
          <Card className="border-2 border-dashed">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Agentes IA
                    <span className="text-sm font-normal text-muted-foreground">(Opcional)</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Adicione agentes de IA relacionados ao produto.
                  </p>
                </div>
                <Button onClick={addAiAgent} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Agente
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiAgents.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum agente IA adicionado.</p>
                  <p className="text-sm">Clique em "Adicionar Agente" para começar.</p>
                </div>
              ) : (
                aiAgents.map((agent) => (
                  <div key={agent.id} className="border p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Título do Agente</Label>
                      <div className="flex items-center gap-2">
                        {agent.saved ? (
                          <Badge variant="outline" className="text-green-600 bg-green-50">
                            <Save className="w-3 h-3 mr-1" />
                            Salvo
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600 bg-orange-50">
                            Não salvo
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeAiAgent(agent.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      value={agent.title}
                      onChange={(e) => updateAiAgent(agent.id, 'title', e.target.value)}
                      placeholder="Nome do agente IA"
                    />
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={agent.description}
                        onChange={(e) => updateAiAgent(agent.id, 'description', e.target.value)}
                        placeholder="Descrição do agente IA"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Link de Acesso</Label>
                      <Input
                        value={agent.url}
                        onChange={(e) => updateAiAgent(agent.id, 'url', e.target.value)}
                        placeholder="URL do agente IA"
                      />
                    </div>
                    
                    {/* Preview do botão */}
                    {agent.url && (
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Preview do botão:</p>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Acessar {agent.title || 'Agente IA'}
                        </Button>
                      </div>
                    )}

                    {/* Botão de salvar individual */}
                    <Button 
                      onClick={() => saveAiAgent(agent.id)}
                      disabled={agent.saved || (!agent.title && !agent.description && !agent.url)}
                      className="w-full"
                      variant={agent.saved ? "outline" : "default"}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {agent.saved ? 'Agente Salvo' : 'Salvar Agente'}
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Botão Salvar Fixo no Rodapé */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto">
          <Button 
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
            disabled={!productTitle.trim()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Salvar e Publicar Produto
          </Button>
        </div>
      </div>
    </div>
  );
}

