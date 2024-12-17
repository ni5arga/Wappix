import JSZip from 'jszip';
import { FILE_TYPES } from './constants';

async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function readZipFile(file: File): Promise<string> {
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  const txtFiles = Object.keys(contents.files).filter(name => 
    name.endsWith(FILE_TYPES.TEXT)
  );
  
  if (txtFiles.length === 0) {
    throw new Error('No chat files found in ZIP');
  }
  
  const chatFile = contents.files[txtFiles[0]];
  return await chatFile.async('text');
}

export async function handleFile(file: File): Promise<string> {
  if (file.name.endsWith(FILE_TYPES.ZIP)) {
    return readZipFile(file);
  }
  return readTextFile(file);
}