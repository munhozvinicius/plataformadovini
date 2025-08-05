import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Trash2, Edit3 } from 'lucide-react';

export default function DynamicTable({ 
  title = "Tabela de Preços", 
  data = [], 
  onDataChange, 
  onTitleChange 
}) {
  const [tableTitle, setTableTitle] = useState(title);
  const [tableData, setTableData] = useState(data);
  const [editingTitle, setEditingTitle] = useState(false);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setTableTitle(title);
  }, [title]);

  // Inicializar tabela vazia se não houver dados
  useEffect(() => {
    if (tableData.length === 0) {
      const initialData = [
        { 'Coluna 1': '', 'Coluna 2': '', 'Coluna 3': '' }
      ];
      setTableData(initialData);
      onDataChange?.(initialData);
    }
  }, []);

  const handleTitleChange = (newTitle) => {
    setTableTitle(newTitle);
    onTitleChange?.(newTitle);
    setEditingTitle(false);
  };

  const addColumn = () => {
    const newColumnName = `Coluna ${Object.keys(tableData[0] || {}).length + 1}`;
    const updatedData = tableData.map(row => ({
      ...row,
      [newColumnName]: ''
    }));
    setTableData(updatedData);
    onDataChange?.(updatedData);
  };

  const removeColumn = () => {
    if (tableData.length === 0) return;
    
    const columns = Object.keys(tableData[0]);
    if (columns.length <= 1) return; // Manter pelo menos uma coluna
    
    const lastColumn = columns[columns.length - 1];
    const updatedData = tableData.map(row => {
      const newRow = { ...row };
      delete newRow[lastColumn];
      return newRow;
    });
    setTableData(updatedData);
    onDataChange?.(updatedData);
  };

  const addRow = () => {
    if (tableData.length === 0) return;
    
    const columns = Object.keys(tableData[0]);
    const newRow = {};
    columns.forEach(col => {
      newRow[col] = '';
    });
    
    const updatedData = [...tableData, newRow];
    setTableData(updatedData);
    onDataChange?.(updatedData);
  };

  const removeRow = () => {
    if (tableData.length <= 1) return; // Manter pelo menos uma linha
    
    const updatedData = tableData.slice(0, -1);
    setTableData(updatedData);
    onDataChange?.(updatedData);
  };

  const updateCell = (rowIndex, columnName, value) => {
    const updatedData = tableData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [columnName]: value };
      }
      return row;
    });
    setTableData(updatedData);
    onDataChange?.(updatedData);
  };

  const updateColumnHeader = (oldName, newName) => {
    if (oldName === newName || !newName.trim()) return;
    
    const updatedData = tableData.map(row => {
      const newRow = {};
      Object.keys(row).forEach(key => {
        if (key === oldName) {
          newRow[newName] = row[key];
        } else {
          newRow[key] = row[key];
        }
      });
      return newRow;
    });
    setTableData(updatedData);
    onDataChange?.(updatedData);
  };

  const removeSpecificRow = (rowIndex) => {
    if (tableData.length <= 1) return;
    
    const updatedData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(updatedData);
    onDataChange?.(updatedData);
  };

  if (tableData.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Tabela de Preços</h4>
          <Button onClick={() => {
            const initialData = [{ 'Coluna 1': '', 'Coluna 2': '', 'Coluna 3': '' }];
            setTableData(initialData);
            onDataChange?.(initialData);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Tabela
          </Button>
        </div>
      </div>
    );
  }

  const columns = Object.keys(tableData[0] || {});

  return (
    <div className="space-y-4">
      {/* Título da Tabela Editável */}
      <div className="flex items-center gap-2">
        {editingTitle ? (
          <Input
            value={tableTitle}
            onChange={(e) => setTableTitle(e.target.value)}
            onBlur={() => handleTitleChange(tableTitle)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleTitleChange(tableTitle);
              }
            }}
            className="text-lg font-semibold"
            autoFocus
          />
        ) : (
          <h4 
            className="text-lg font-semibold cursor-pointer hover:text-blue-600 flex items-center gap-2"
            onClick={() => setEditingTitle(true)}
          >
            📊 {tableTitle}
            <Edit3 className="w-4 h-4 opacity-50" />
          </h4>
        )}
      </div>

      {/* Controles da Tabela */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" onClick={addColumn}>
            <Plus className="w-4 h-4 mr-1" />
            Coluna
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={removeColumn}
            disabled={columns.length <= 1}
          >
            <Minus className="w-4 h-4 mr-1" />
            Coluna
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" onClick={addRow}>
            <Plus className="w-4 h-4 mr-1" />
            Linha
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={removeRow}
            disabled={tableData.length <= 1}
          >
            <Minus className="w-4 h-4 mr-1" />
            Linha
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100">
              {columns.map((column, index) => (
                <th key={column} className="p-3 text-left border-b">
                  <Input
                    value={column}
                    onChange={(e) => updateColumnHeader(column, e.target.value)}
                    className="font-semibold bg-transparent border-none p-0 h-auto"
                    placeholder="Nome da coluna"
                  />
                </th>
              ))}
              <th className="p-3 text-center border-b w-16">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column} className="p-2 border-b">
                    <Input
                      value={row[column] || ''}
                      onChange={(e) => updateCell(rowIndex, column, e.target.value)}
                      placeholder="Digite o valor"
                      className="border-none bg-transparent p-1"
                    />
                  </td>
                ))}
                <td className="p-2 border-b text-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSpecificRow(rowIndex)}
                    disabled={tableData.length <= 1}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Informações da Tabela */}
      <div className="text-sm text-muted-foreground">
        {tableData.length} linha(s) × {columns.length} coluna(s)
      </div>
    </div>
  );
}

