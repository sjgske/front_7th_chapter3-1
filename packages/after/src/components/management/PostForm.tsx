import React from 'react';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';

type PostFormData = {
  title?: string;
  author?: string;
  category?: string;
  content?: string;
};

type PostFormProps = {
  formData: PostFormData;
  onFormDataChange: (data: PostFormData) => void;
  idPrefix?: string;
};

export const PostForm: React.FC<PostFormProps> = ({
  formData,
  onFormDataChange,
  idPrefix = '',
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}title`}>
          제목 <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}title`}
          value={formData.title || ''}
          onChange={(e) =>
            onFormDataChange({ ...formData, title: e.target.value })
          }
          placeholder="게시글 제목을 입력하세요"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}author`}>
            작성자 <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${idPrefix}author`}
            value={formData.author || ''}
            onChange={(e) =>
              onFormDataChange({ ...formData, author: e.target.value })
            }
            placeholder="작성자명"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>카테고리</Label>
          <Select
            value={formData.category || ''}
            onValueChange={(value) =>
              onFormDataChange({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="accessibility">Accessibility</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}content`}>내용</Label>
        <Textarea
          id={`${idPrefix}content`}
          value={formData.content || ''}
          onChange={(e) =>
            onFormDataChange({ ...formData, content: e.target.value })
          }
          placeholder="게시글 내용을 입력하세요"
          rows={6}
        />
      </div>
    </>
  );
};
