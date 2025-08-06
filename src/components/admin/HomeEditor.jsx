import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, RotateCcw, Edit3, Plus, Trash2 } from 'lucide-react';

const HomeEditor = () => {
  const [homeData, setHomeData] = useState({
    hero_title: 'Plataforma do Vini',
    hero_subtitle: 'Central Comercial',
    hero_description: 'Sua central de produtos e serviços Vivo para empresas',
    welcome_title: 'Bem-vindo à Plataforma do Vini',
    welcome_description: 'Aqui você encontra todos os produtos e serviços Vivo para sua empresa. Navegue pelo menu lateral para conhecer nossas soluções.',
    features: [
      {
        id: 1,
        title: 'Produtos Vivo',
        description: 'Conheça nossa linha completa de produtos para empresas',
        icon: '📱'
      },
      {
        id: 2,
        title: 'Suporte Especializado',
        description: 'Atendimento personalizado para sua empresa',
        icon: '🎧'
      },
      {
        id: 3,
        title: 'Soluções Integradas',
        description: 'Combine produtos para otimizar seus resultados',
        icon: '🔧'
      }
    ],
    contact_info: {
      phone: '(11) 99999-9999',
      email: 'contato@plataformadovini.com.br',
      address: 'São Paulo, SP'
    }
  });
  const [saving, setSaving] = useState(false);
  const [editingTitles, setEditingTitles] = useState({});

  useEffect(() => {
    // Carregar dados da página Home do localStorage ou API
    const savedData = localStorage.getItem('home-page-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setHomeData(parsedData);
      } catch (error) {
        console.error('Erro ao carregar dados da página Home:', error);
      }
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Salvar no localStorage por enquanto (depois será API)
      localStorage.setItem('home-page-data', JSON.stringify(homeData));
      alert('Página Home atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao salvar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja restaurar os dados padrão da página Home?')) {
      const defaultData = {
        hero_title: 'Plataforma do Vini',
        hero_subtitle: 'Central Comercial',
        hero_description: 'Sua central de produtos e serviços Vivo para empresas',
        welcome_title: 'Bem-vindo à Plataforma do Vini',
        welcome_description: 'Aqui você encontra todos os produtos e serviços Vivo para sua empresa. Navegue pelo menu lateral para conhecer nossas soluções.',
        features: [
          {
            id: 1,
            title: 'Produtos Vivo',
            description: 'Conheça nossa linha completa de produtos para empresas',
            icon: '📱'
          },
          {
            id: 2,
            title: 'Suporte Especializado',
            description: 'Atendimento personalizado para sua empresa',
            icon: '🎧'
          },
          {
            id: 3,
            title: 'Soluções Integradas',
            description: 'Combine produtos para otimizar seus resultados',
            icon: '🔧'
          }
        ],
        contact_info: {
          phone: '(11) 99999-9999',
          email: 'contato@plataformadovini.com.br',
          address: 'São Paulo, SP'
        }
      };
      setHomeData(defaultData);
      alert('Dados restaurados para o padrão!');
    }
  };

  const updateField = (field, value) => {
    setHomeData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent, field, value) => {
    setHomeData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const addFeature = () => {
    const newFeature = {
      id: Date.now(),
      title: 'Nova Funcionalidade',
      description: 'Descrição da nova funcionalidade',
      icon: '⭐'
    };
    setHomeData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }));
  };

  const updateFeature = (featureId, field, value) => {
    setHomeData(prev => ({
      ...prev,
      features: prev.features.map(feature =>
        feature.id === featureId ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const removeFeature = (featureId) => {
    setHomeData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature.id !== featureId)
    }));
  };

  const emojis = ['📱', '🎧', '🔧', '💼', '🌐', '📊', '⚡', '🚀', '💡', '🎯', '🔥', '⭐'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">🏠 Editor da Página Home</h2>
          <p className="text-gray-600">
            Edite o conteúdo da página inicial da plataforma.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Restaurar Padrão
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Seção Hero</TabsTrigger>
          <TabsTrigger value="welcome">Boas-vindas</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Seção Hero (Topo da Página)</CardTitle>
              <p className="text-sm text-gray-600">
                Esta é a primeira seção que os usuários veem ao acessar a plataforma.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título Principal</label>
                <Input
                  value={homeData.hero_title}
                  onChange={(e) => updateField('hero_title', e.target.value)}
                  placeholder="Título principal da página"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subtítulo</label>
                <Input
                  value={homeData.hero_subtitle}
                  onChange={(e) => updateField('hero_subtitle', e.target.value)}
                  placeholder="Subtítulo da página"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <Textarea
                  value={homeData.hero_description}
                  onChange={(e) => updateField('hero_description', e.target.value)}
                  placeholder="Descrição da plataforma"
                  rows={3}
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-600 mb-3 font-medium">Preview da Seção Hero:</p>
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-purple-900 mb-2">{homeData.hero_title}</h1>
                  <h2 className="text-xl text-purple-700 mb-3">{homeData.hero_subtitle}</h2>
                  <p className="text-purple-600">{homeData.hero_description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="welcome" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>👋 Seção de Boas-vindas</CardTitle>
              <p className="text-sm text-gray-600">
                Mensagem de boas-vindas e introdução à plataforma.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título de Boas-vindas</label>
                <Input
                  value={homeData.welcome_title}
                  onChange={(e) => updateField('welcome_title', e.target.value)}
                  placeholder="Título da seção de boas-vindas"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <Textarea
                  value={homeData.welcome_description}
                  onChange={(e) => updateField('welcome_description', e.target.value)}
                  placeholder="Descrição de boas-vindas"
                  rows={4}
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 mb-3 font-medium">Preview da Seção de Boas-vindas:</p>
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">{homeData.welcome_title}</h3>
                  <p className="text-blue-700">{homeData.welcome_description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>⭐ Funcionalidades em Destaque</CardTitle>
                  <p className="text-sm text-gray-600">
                    Cards com as principais funcionalidades da plataforma.
                  </p>
                </div>
                <Button onClick={addFeature} variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Funcionalidade
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {homeData.features.map((feature, index) => (
                <Card key={feature.id} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Funcionalidade {index + 1}</h5>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(feature.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Ícone</label>
                          <div className="grid grid-cols-6 gap-1">
                            {emojis.map((emoji) => (
                              <Button
                                key={emoji}
                                variant={feature.icon === emoji ? "default" : "outline"}
                                className="text-lg h-8 w-8 p-0"
                                onClick={() => updateFeature(feature.id, 'icon', emoji)}
                              >
                                {emoji}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Título</label>
                          <Input
                            value={feature.title}
                            onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                            placeholder="Título da funcionalidade"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Descrição</label>
                          <Textarea
                            value={feature.description}
                            onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                            placeholder="Descrição da funcionalidade"
                            rows={2}
                          />
                        </div>
                      </div>
                      
                      {/* Preview do card */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Preview do card:</p>
                        <div className="bg-white p-3 rounded border text-center">
                          <div className="text-2xl mb-2">{feature.icon}</div>
                          <h4 className="font-medium mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📞 Informações de Contato</CardTitle>
              <p className="text-sm text-gray-600">
                Dados de contato exibidos na plataforma.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Telefone</label>
                <Input
                  value={homeData.contact_info.phone}
                  onChange={(e) => updateNestedField('contact_info', 'phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">E-mail</label>
                <Input
                  value={homeData.contact_info.email}
                  onChange={(e) => updateNestedField('contact_info', 'email', e.target.value)}
                  placeholder="contato@exemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Endereço</label>
                <Input
                  value={homeData.contact_info.address}
                  onChange={(e) => updateNestedField('contact_info', 'address', e.target.value)}
                  placeholder="Cidade, Estado"
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 mb-3 font-medium">Preview das Informações de Contato:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span>{homeData.contact_info.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✉️</span>
                    <span>{homeData.contact_info.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{homeData.contact_info.address}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeEditor;

