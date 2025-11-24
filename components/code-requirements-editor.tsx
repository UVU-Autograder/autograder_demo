import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { CodeRequirements } from '@/lib/types';
import { codeAnalysisService } from '@/lib/services/code-analysis.service';

interface CodeRequirementsEditorProps {
  requirements: CodeRequirements;
  onChange: (requirements: CodeRequirements) => void;
  language: string;
}

export function CodeRequirementsEditor({ requirements, onChange, language }: CodeRequirementsEditorProps) {
  const [expandedSections, setExpandedSections] = React.useState({
    counts: true,
    constructs: false,
    style: false,
    advanced: false,
  });

  const availableRules = codeAnalysisService.getAvailableRules();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateRequirement = <K extends keyof CodeRequirements>(
    key: K,
    value: CodeRequirements[K]
  ) => {
    onChange({ ...requirements, [key]: value });
  };

  const toggleConstruct = (construct: string, isRequired: boolean) => {
    const currentList = isRequired ? requirements.requiredConstructs || [] : requirements.forbiddenConstructs || [];
    const otherList = isRequired ? requirements.forbiddenConstructs || [] : requirements.requiredConstructs || [];
    
    // Remove from other list if present
    const newOtherList = otherList.filter(c => c !== construct);
    
    // Toggle in current list
    const newList = currentList.includes(construct)
      ? currentList.filter(c => c !== construct)
      : [...currentList, construct];
    
    onChange({
      ...requirements,
      [isRequired ? 'requiredConstructs' : 'forbiddenConstructs']: newList,
      [isRequired ? 'forbiddenConstructs' : 'requiredConstructs']: newOtherList,
    });
  };

  const constructCategories = React.useMemo(() => {
    const pythonConstructs = availableRules.find(r => r.category === 'Python Constructs')?.rules || [];
    return {
      control: pythonConstructs.filter(r => ['if_statement', 'elif_statement', 'else_statement', 'for_loop', 'while_loop'].includes(r)),
      functions: pythonConstructs.filter(r => ['function_definition', 'main_function', 'recursion', 'lambda_function'].includes(r)),
      oop: pythonConstructs.filter(r => ['class_definition'].includes(r)),
      advanced: pythonConstructs.filter(r => ['try_except', 'list_comprehension', 'dictionary_comprehension'].includes(r)),
    };
  }, [availableRules]);

  if (language.toLowerCase() !== 'python') {
    return (
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Code Requirements</CardTitle>
          <CardDescription>Code analysis is currently only available for Python assignments</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Count Requirements */}
      <Card className="border-slate-200 hover:border-blue-300 transition-colors">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('counts')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Count Requirements</CardTitle>
              {(requirements.minFunctions || requirements.minClasses || requirements.minLoops) && (
                <Badge variant="secondary" className="text-xs">
                  {[requirements.minFunctions, requirements.minClasses, requirements.minLoops].filter(Boolean).length} active
                </Badge>
              )}
            </div>
            {expandedSections.counts ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
          <CardDescription>Set minimum/maximum requirements for code structure</CardDescription>
        </CardHeader>
        
        {expandedSections.counts && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minFunctions" className="flex items-center gap-2">
                  Minimum Functions
                  <Info className="h-3 w-3 text-slate-400" />
                </Label>
                <Input
                  id="minFunctions"
                  type="number"
                  min="0"
                  placeholder="No minimum"
                  value={requirements.minFunctions || ''}
                  onChange={(e) => updateRequirement('minFunctions', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minClasses" className="flex items-center gap-2">
                  Minimum Classes
                  <Info className="h-3 w-3 text-slate-400" />
                </Label>
                <Input
                  id="minClasses"
                  type="number"
                  min="0"
                  placeholder="No minimum"
                  value={requirements.minClasses || ''}
                  onChange={(e) => updateRequirement('minClasses', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minLoops" className="flex items-center gap-2">
                  Minimum Loops
                  <Info className="h-3 w-3 text-slate-400" />
                </Label>
                <Input
                  id="minLoops"
                  type="number"
                  min="0"
                  placeholder="No minimum"
                  value={requirements.minLoops || ''}
                  onChange={(e) => updateRequirement('minLoops', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minLines" className="flex items-center gap-2">
                  Minimum Lines of Code
                  <Info className="h-3 w-3 text-slate-400" />
                </Label>
                <Input
                  id="minLines"
                  type="number"
                  min="0"
                  placeholder="No minimum"
                  value={requirements.minLines || ''}
                  onChange={(e) => updateRequirement('minLines', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="border-slate-200"
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Required/Forbidden Constructs */}
      <Card className="border-slate-200 hover:border-blue-300 transition-colors">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('constructs')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Code Constructs</CardTitle>
              {((requirements.requiredConstructs?.length || 0) + (requirements.forbiddenConstructs?.length || 0) > 0) && (
                <Badge variant="secondary" className="text-xs">
                  {(requirements.requiredConstructs?.length || 0) + (requirements.forbiddenConstructs?.length || 0)} rules
                </Badge>
              )}
            </div>
            {expandedSections.constructs ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
          <CardDescription>Specify which programming constructs must be used or avoided</CardDescription>
        </CardHeader>

        {expandedSections.constructs && (
          <CardContent className="space-y-6">
            {/* Control Flow */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Control Flow</h4>
              <div className="grid grid-cols-2 gap-3">
                {constructCategories.control.map((construct) => (
                  <ConstructCheckbox
                    key={construct}
                    construct={construct}
                    isRequired={requirements.requiredConstructs?.includes(construct)}
                    isForbidden={requirements.forbiddenConstructs?.includes(construct)}
                    onToggleRequired={() => toggleConstruct(construct, true)}
                    onToggleForbidden={() => toggleConstruct(construct, false)}
                  />
                ))}
              </div>
            </div>

            {/* Functions */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Functions & Methods</h4>
              <div className="grid grid-cols-2 gap-3">
                {constructCategories.functions.map((construct) => (
                  <ConstructCheckbox
                    key={construct}
                    construct={construct}
                    isRequired={requirements.requiredConstructs?.includes(construct)}
                    isForbidden={requirements.forbiddenConstructs?.includes(construct)}
                    onToggleRequired={() => toggleConstruct(construct, true)}
                    onToggleForbidden={() => toggleConstruct(construct, false)}
                  />
                ))}
              </div>
            </div>

            {/* OOP */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Object-Oriented</h4>
              <div className="grid grid-cols-2 gap-3">
                {constructCategories.oop.map((construct) => (
                  <ConstructCheckbox
                    key={construct}
                    construct={construct}
                    isRequired={requirements.requiredConstructs?.includes(construct)}
                    isForbidden={requirements.forbiddenConstructs?.includes(construct)}
                    onToggleRequired={() => toggleConstruct(construct, true)}
                    onToggleForbidden={() => toggleConstruct(construct, false)}
                  />
                ))}
              </div>
            </div>

            {/* Advanced */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Advanced Patterns</h4>
              <div className="grid grid-cols-2 gap-3">
                {constructCategories.advanced.map((construct) => (
                  <ConstructCheckbox
                    key={construct}
                    construct={construct}
                    isRequired={requirements.requiredConstructs?.includes(construct)}
                    isForbidden={requirements.forbiddenConstructs?.includes(construct)}
                    onToggleRequired={() => toggleConstruct(construct, true)}
                    onToggleForbidden={() => toggleConstruct(construct, false)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Style Requirements */}
      <Card className="border-slate-200 hover:border-blue-300 transition-colors">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('style')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Style & Conventions</CardTitle>
              {(requirements.namingConvention || requirements.requireDocstrings || requirements.requireTypeHints || requirements.requireComments) && (
                <Badge variant="secondary" className="text-xs">Active</Badge>
              )}
            </div>
            {expandedSections.style ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
          <CardDescription>Enforce coding style and best practices</CardDescription>
        </CardHeader>

        {expandedSections.style && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="namingConvention">Naming Convention</Label>
              <select
                id="namingConvention"
                value={requirements.namingConvention || ''}
                onChange={(e) => updateRequirement('namingConvention', e.target.value as 'snake_case' | 'camelCase' | undefined || undefined)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No requirement</option>
                <option value="snake_case">snake_case (Python standard)</option>
                <option value="camelCase">camelCase (JavaScript style)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireDocstrings"
                  checked={requirements.requireDocstrings || false}
                  onCheckedChange={(checked) => updateRequirement('requireDocstrings', checked as boolean)}
                />
                <Label htmlFor="requireDocstrings" className="cursor-pointer">
                  Require Docstrings
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireTypeHints"
                  checked={requirements.requireTypeHints || false}
                  onCheckedChange={(checked) => updateRequirement('requireTypeHints', checked as boolean)}
                />
                <Label htmlFor="requireTypeHints" className="cursor-pointer">
                  Require Type Hints
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireComments"
                  checked={requirements.requireComments || false}
                  onCheckedChange={(checked) => updateRequirement('requireComments', checked as boolean)}
                />
                <Label htmlFor="requireComments" className="cursor-pointer">
                  Require Comments
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireFString"
                  checked={requirements.requireFString || false}
                  onCheckedChange={(checked) => updateRequirement('requireFString', checked as boolean)}
                />
                <Label htmlFor="requireFString" className="cursor-pointer">
                  Require F-Strings
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireInputPrompt"
                  checked={requirements.requireInputPrompt || false}
                  onCheckedChange={(checked) => updateRequirement('requireInputPrompt', checked as boolean)}
                />
                <Label htmlFor="requireInputPrompt" className="cursor-pointer">
                  Require Input Prompts
                </Label>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Summary */}
      {(requirements.minFunctions || requirements.requiredConstructs?.length || requirements.namingConvention) && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-sm text-blue-900">Requirements Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {requirements.minFunctions && (
                <Badge variant="outline" className="bg-white">≥{requirements.minFunctions} functions</Badge>
              )}
              {requirements.minClasses && (
                <Badge variant="outline" className="bg-white">≥{requirements.minClasses} classes</Badge>
              )}
              {requirements.minLoops && (
                <Badge variant="outline" className="bg-white">≥{requirements.minLoops} loops</Badge>
              )}
              {requirements.requiredConstructs?.map(construct => (
                <Badge key={construct} className="bg-green-100 text-green-800 border-green-300">
                  ✓ {construct.replace(/_/g, ' ')}
                </Badge>
              ))}
              {requirements.forbiddenConstructs?.map(construct => (
                <Badge key={construct} className="bg-red-100 text-red-800 border-red-300">
                  ✗ {construct.replace(/_/g, ' ')}
                </Badge>
              ))}
              {requirements.namingConvention && (
                <Badge variant="outline" className="bg-white">{requirements.namingConvention}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface ConstructCheckboxProps {
  construct: string;
  isRequired?: boolean;
  isForbidden?: boolean;
  onToggleRequired: () => void;
  onToggleForbidden: () => void;
}

function ConstructCheckbox({ construct, isRequired, isForbidden, onToggleRequired, onToggleForbidden }: ConstructCheckboxProps) {
  const displayName = construct.replace(/_/g, ' ');
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
      <span className="text-sm font-medium text-slate-700 capitalize">{displayName}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleRequired}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            isRequired
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-slate-50 text-slate-600 hover:bg-green-50 border border-slate-200'
          }`}
          title="Must be present"
        >
          Required
        </button>
        <button
          type="button"
          onClick={onToggleForbidden}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            isForbidden
              ? 'bg-red-100 text-red-800 border border-red-300'
              : 'bg-slate-50 text-slate-600 hover:bg-red-50 border border-slate-200'
          }`}
          title="Must not be present"
        >
          Forbidden
        </button>
      </div>
    </div>
  );
}
