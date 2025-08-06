import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { loadRealHomeData, saveRealHomeData } from '../../data/realHomeData';

const RealHomeEditor = () => {
  const [homeData, setHomeData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Carregar dados REAIS da Home
    const data = loadRealHomeData();
    setHomeData(data);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = saveRealHomeData(homeData);
      if (success) {
        alert('Página Home atualizada com sucesso!\n\nAs mudanças já estão visíveis na página inicial.');
        // Forçar reload da página para mostrar mudanças
        window.location.reload();
      } else {
        throw new Error('Falha ao salvar dados');
      }
    } catch (error) {
      alert('Erro ao salvar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja restaurar os dados padrão da página Home?')) {
      const data = loadRealHomeData();
      setHomeData(data);
      alert('Dados restaurados para o padrão!');
    }
  };

  const updateField = (section, field, value) => {
    setHomeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
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

  const addFeature = () => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      icon: 'Zap',
      title: 'Nova Funcionalidade',
      description: 'Descrição da nova funcionalidade',
      gradient: 'gradient-purple'
    };
    setHomeData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }));
  };

  const removeFeature = (featureId) => {
    setHomeData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature.id !== featureId)
    }));
  };

  if (!homeData) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p>Carregando editor REAL...</p>
      </div>
    </div>;
  }

  const iconOptions = ['Bot', 'DollarSign', 'Zap', 'Package', 'Database', 'Shield', 'Users', 'Settings'];
  const gradientOptions = ['gradient-purple', 'gradient-silver', 'gradient-blue', 'gradient-green'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">🏠 Editor REAL da Página Home</h2>
          <p className="text-gray-600">
            Edite o conteúdo REAL da página inicial - as mudanças aparecem imediatamente.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Restaurar Padrão
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? 'Salvando...' : 'Salvar e Publicar'}
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
                  value={homeData.hero.title}
                  onChange={(e) => updateField('hero', 'title', e.target.value)}
                  placeholder="Título principal da página"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subtítulo</label>
                <Input
                  value={homeData.hero.subtitle}
                  onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                  placeholder="Subtítulo da página"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <Textarea
                  value={homeData.hero.description}
                  onChange={(e) => updateField('hero', 'description', e.target.value)}
                  placeholder="Descrição da plataforma"
                  rows={3}
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-600 mb-3 font-medium">Preview da Seção Hero:</p>
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-purple-900 mb-2">{homeData.hero.title}</h1>
                  <h2 className="text-xl text-purple-700 mb-3">{homeData.hero.subtitle}</h2>
                  <p className="text-purple-600">{homeData.hero.description}</p>
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
                  value={homeData.welcome.title}
                  onChange={(e) => updateField('welcome', 'title', e.target.value)}
                  placeholder="Título da seção de boas-vindas"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mensagem</label>
                <Textarea
                  value={homeData.welcome.message}
                  onChange={(e) => updateField('welcome', 'message', e.target.value)}
                  placeholder="Mensagem de boas-vindas"
                  rows={4}
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 mb-3 font-medium">Preview da Seção de Boas-vindas:</p>
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">{homeData.welcome.title}</h3>
                  <p className="text-blue-700">{homeData.welcome.message}</p>
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Ícone</label>
                          <select
                            value={feature.icon}
                            onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            {iconOptions.map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Gradiente</label>
                          <select
                            value={feature.gradient}
                            onChange={(e) => updateFeature(feature.id, 'gradient', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            {gradientOptions.map(gradient => (
                              <option key={gradient} value={gradient}>{gradient}</option>
                            ))}
                          </select>
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
                          rows={3}
                        />
                      </div>
                      
                      {/* Preview do card */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Preview do card:</p>
                        <div className="bg-white p-4 rounded border">
                          <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center mb-3`}>
                            <span className="text-white font-bold">{feature.icon.charAt(0)}</span>
                          </div>
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
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
                  value={homeData.contact.phone}
                  onChange={(e) => updateField('contact', 'phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">E-mail</label>
                <Input
                  value={homeData.contact.email}
                  onChange={(e) => updateField('contact', 'email', e.target.value)}
                  placeholder="contato@exemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Endereço</label>
                <Input
                  value={homeData.contact.address}
                  onChange={(e) => updateField('contact', 'address', e.target.value)}
                  placeholder="Cidade, Estado"
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 mb-3 font-medium">Preview das Informações de Contato:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span>{homeData.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✉️</span>
                    <span>{homeData.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{homeData.contact.address}</span>
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

export default RealHomeEditor;

