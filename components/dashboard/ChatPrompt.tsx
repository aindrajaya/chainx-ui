'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MonitorPlay,
  FileText,
  MessageSquare,
  Settings,
  Paperclip,
  ArrowUp,
} from 'lucide-react';
import Templates from './Templates';
import { TEMPLATES } from '../../app/templatesData';


const ChatPrompt = () => {
  const [selectedOutputType, setSelectedOutputType] = useState<string | null>(null);
  const [mode, setMode] = useState('auto');
  const [promptText, setPromptText] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const outputTypes = [
    { id: 'slides', label: 'Slides', icon: MonitorPlay, color: 'primary' },
    { id: 'document', label: 'Document', icon: FileText, color: 'primary' },
    { id: 'social', label: 'Social Media', icon: MessageSquare, color: 'primary' },
    { id: 'custom', label: 'Custom Size', icon: Settings, color: 'primary' },
  ];

  const suggestionPrompts = [
    'Generate Proper Audit Report',
    'Draft Audit Report Plan',
    'Audit Campaign',
    'Audit Research Report',
  ];

  const handleOutputTypeSelect = (typeId: string) => {
    setSelectedOutputType(typeId);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPromptText(suggestion);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting prompt:', promptText, 'Mode:', mode, 'Output type:', selectedOutputType, 'Attached file:', attachedFile?.name);
    // You can add your submission logic here
  };

  const handleAttachment = () => {
    // Trigger file input
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      console.log('File attached:', file.name, 'Size:', file.size, 'Type:', file.type);
      // You can add file processing logic here
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 mt-16 sm:p-x">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="text-green-700">ChainX</span> AI Scanner <span className="text-green-700">made secure.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          From prompts to polished report, proposal, or resume in seconds.
        </p>
      </div>

      <div className="flex justify-center mt-10 space-x-6">
        {outputTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedOutputType === type.id;
          return (
            <div key={type.id} className="flex flex-col items-center space-y-2 min-w-[100px]">
              <Button
                variant="outline"
                size="lg"
                className={`p-6 border-2 rounded-xl transition-all duration-200 transform active:scale-95 ${
                  isSelected
                    ? `border-${type.color} bg-${type.color}/10 shadow-md`
                    : `border-gray-300 bg-white hover:border-${type.color}/50 hover:bg-${type.color}/5 hover:scale-105`
                }`}
                onClick={() => handleOutputTypeSelect(type.id)}
              >
                <Icon className={`w-8 h-8 ${isSelected ? `text-${type.color}` : 'text-gray-500'}`} />
              </Button>
              <span className="font-semibold text-center text-sm leading-tight min-h-[2.5rem] flex items-center justify-center px-1">
                {type.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <div className="relative bg-white rounded-lg">
          <Textarea
            className="w-full p-4 pr-28 text-base border-gray-200 rounded-lg resize-none min-h-[100px] focus:border-primary/50 focus:ring-primary/50"
            placeholder="Ask me anything..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
          />
          <div className="absolute bottom-3 left-3">
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-[100px] bg-gray-100">
                <SelectValue placeholder="Auto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <Button variant="ghost" size="icon" onClick={handleAttachment}>
              <Paperclip className={`w-5 h-5 ${attachedFile ? 'text-primary' : 'text-gray-500'}`} />
            </Button>
            <Button size="icon" onClick={handleSubmit}>
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {attachedFile && (
        <div className="mt-2 flex items-center justify-center">
          <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-700">
            <Paperclip className="w-4 h-4" />
            <span>{attachedFile.name}</span>
            <button
              onClick={() => setAttachedFile(null)}
              className="text-blue-500 hover:text-blue-700 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center mt-4 space-x-2">
        {suggestionPrompts.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            className="rounded-full bg-gray-50"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((template) => (
            <Templates key={template.id} template={template} />
          ))}
      </div> */}
    </div>


  );
};

export default ChatPrompt;
