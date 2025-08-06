// RichTextEditor.jsx
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Bold, Italic, Underline, Link } from 'lucide-react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'

interface NoteEditorProps {
  initialContent?: string
  placeholder?: string
  onChange?: (html: string, text: string) => void
  onBlur?: (html: string, text: string) => void
  onFocus?: (html: string, text: string) => void
  className?: string
  height?: string
  disabled?: boolean
  showToolbar?: boolean
}

export interface NoteEditorRef {
  focus: () => void
  blur: () => void
  getCurrentContent: () => { html: string; text: string }
  setContent: (html: string) => void
  clear: () => void
}

const NoteEditor = forwardRef<NoteEditorRef, NoteEditorProps>(({
  initialContent = 'Start typing...',
  placeholder = 'Start typing your notes...',
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  className = '',
  height = 'min-h-64',
  disabled = false,
  showToolbar = true
}, ref) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [selectedRange, setSelectedRange] = useState<Range | null>(null)
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false
  })

  // Set initial content only once
  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent
    }
    // eslint-disable-next-line
  }, [])

  const updateActiveFormats = () => {
    if (disabled) return
    try {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline')
      })
    } catch {
      setActiveFormats({
        bold: false,
        italic: false,
        underline: false
      })
    }
  }

  const handleSelectionChange = () => {
    updateActiveFormats()
  }

  const execCommand = (command: string, value: string | undefined = undefined) => {
    if (disabled) return
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    setTimeout(updateActiveFormats, 10)
    setTimeout(() => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML, editorRef.current.innerText)
      }
    }, 10)
  }

  const handleBold = () => execCommand('bold')
  const handleItalic = () => execCommand('italic')
  const handleUnderline = () => execCommand('underline')

  const handleLink = () => {
    if (disabled) return
    const selection = window.getSelection()
    if (!selection || selection.toString().trim() === '') {
      alert('Please select some text first to create a link.')
      return
    }
    const range = selection.getRangeAt(0)
    setSelectedRange(range)
    setShowLinkDialog(true)
  }

  const applyLink = () => {
    if (linkUrl.trim() && selectedRange) {
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(selectedRange)
      execCommand('createLink', linkUrl)
      setShowLinkDialog(false)
      setLinkUrl('')
      setSelectedRange(null)
    }
  }

  const cancelLink = () => {
    setShowLinkDialog(false)
    setLinkUrl('')
    setSelectedRange(null)
    editorRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if ((e.ctrlKey || e.metaKey) && !showLinkDialog) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          handleBold()
          break
        case 'i':
          e.preventDefault()
          handleItalic()
          break
        case 'u':
          e.preventDefault()
          handleUnderline()
          break
        case 'k':
          e.preventDefault()
          handleLink()
          break
      }
    }
    if (showLinkDialog && e.key === 'Enter') {
      e.preventDefault()
      applyLink()
    }
    if (showLinkDialog && e.key === 'Escape') {
      e.preventDefault()
      cancelLink()
    }
  }

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    updateActiveFormats()
    onChange(e.currentTarget.innerHTML, e.currentTarget.innerText)
  }

  const handleEditorBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur(e.currentTarget.innerHTML, e.currentTarget.innerText)
  }

  const handleEditorFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    onFocus(e.currentTarget.innerHTML, e.currentTarget.innerText)
  }

  // Get current content
  const getCurrentContent = () => {
    return {
      html: editorRef.current?.innerHTML || '',
      text: editorRef.current?.innerText || ''
    }
  }

  // Expose methods for parent components
  useImperativeHandle(ref, () => ({
    focus: () => editorRef.current?.focus(),
    blur: () => editorRef.current?.blur(),
    getCurrentContent,
    setContent: (html: string) => {
      if (editorRef.current) {
        editorRef.current.innerHTML = html
      }
    },
    clear: () => {
      if (editorRef.current) {
        editorRef.current.innerHTML = ''
      }
    }
  }))

  return (
    <div
      className={`w-full mx-auto bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center gap-1 p-3 border-b border-gray-200 bg-gray-50">
          <button
            onClick={handleBold}
            disabled={disabled}
            className={`p-2 rounded transition-colors ${
              activeFormats.bold
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-200 text-gray-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Bold (Ctrl+B)"
            type="button"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={handleItalic}
            disabled={disabled}
            className={`p-2 rounded transition-colors ${
              activeFormats.italic
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-200 text-gray-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Italic (Ctrl+I)"
            type="button"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={handleUnderline}
            disabled={disabled}
            className={`p-2 rounded transition-colors ${
              activeFormats.underline
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-200 text-gray-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Underline (Ctrl+U)"
            type="button"
          >
            <Underline size={16} />
          </button>
          <button
            onClick={handleLink}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Insert Link (Ctrl+K)"
            type="button"
          >
            <Link size={16} />
          </button>
        </div>
      )}

      {/* Editor Area */}
      <div className="p-4 relative">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          className={`w-full ${height} border-none outline-none text-gray-800 text-base leading-6 ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : ''
          }`}
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            minHeight: '8rem'
          }}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onMouseUp={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          onFocus={handleEditorFocus}
          onBlur={handleEditorBlur}
          suppressContentEditableWarning={true}
          spellCheck={true}
        />
        {/* Placeholder */}
        {editorRef.current && editorRef.current.innerText.trim() === '' && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none opacity-50 select-none">
            {placeholder}
          </div>
        )}
      </div>

      {/* Link Dialog */}
      <Dialog
        open={showLinkDialog}
        onClose={cancelLink}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            label="URL"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            fullWidth
            autoFocus
            margin="dense"
            onKeyDown={handleKeyDown}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLink} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={applyLink}
            color="primary"
            variant="contained"
            disabled={!linkUrl.trim()}
          >
            Insert Link
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
})

NoteEditor.displayName = 'NoteEditor'

export default NoteEditor
