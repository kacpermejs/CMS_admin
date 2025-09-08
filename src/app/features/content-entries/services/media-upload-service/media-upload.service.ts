import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL, getMetadata, updateMetadata } from '@angular/fire/storage';

export interface MediaMetadata {
  title: string;
  description?: string;
  association?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MediaUploadService {
  private storage = inject(Storage);
  private auth = inject(Auth);

  constructor() { }

  async uploadMedia(
    file: File,
    metadata: MediaMetadata
  ): Promise<string> {
    if (!this.auth.currentUser)
      return Promise.reject(new Error('User not logged in!'));
    const userId = this.auth.currentUser.uid;

    const ext = file.name.split('.').pop();
    const safeTitle = metadata.title.replace(/\s+/g, '-').toLowerCase();

    const filePath = `user_uploads/${userId}/${safeTitle}.${ext}`;
    const storageRef = ref(this.storage, filePath);

    await uploadBytes(storageRef, file, {
      customMetadata: {
        title: metadata.title,
        description: metadata.description || '',
        association: metadata.association ? metadata.association.join(',') : ''
      }
    });

    return filePath;
  }

  async addAssociations(filePath: string, newAssociations: string[]): Promise<void> {
    if (!this.auth.currentUser)
      return Promise.reject(new Error('User not logged in!'));
    const storageRef = ref(this.storage, filePath);

    const meta = await getMetadata(storageRef);
    const currentAssoc =
      meta.customMetadata?.['association']?.split(',').filter(Boolean) ?? [];

    const merged = Array.from(new Set([...currentAssoc, ...newAssociations]));

    await updateMetadata(storageRef, {
      customMetadata: {
        ...meta.customMetadata, // keep existing keys like title/description
        association: merged.join(',')
      }
    });
  }

  async removeAssociations(filePath: string, associationsToRemove: string[]): Promise<void> {
    if (!this.auth.currentUser)
      return Promise.reject(new Error('User not logged in!'));
    const storageRef = ref(this.storage, filePath);

    const meta = await getMetadata(storageRef);
    const currentAssoc =
      meta.customMetadata?.['association']?.split(',').filter(Boolean) ?? [];

    const filtered = currentAssoc.filter(a => !associationsToRemove.includes(a));

    await updateMetadata(storageRef, {
      customMetadata: {
        ...meta.customMetadata,
        association: filtered.join(',')
      }
    });
  }

  async getPreviewUrl(filePath: string): Promise<string> {
    //return ''; //temporary =========================================================================================
    if (!filePath) return '';
    const storageRef = ref(this.storage, filePath);
    return await getDownloadURL(storageRef);
  }
}
