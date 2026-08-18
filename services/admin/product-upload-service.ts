export type UploadedProductImage = {
  url: string;
};

export interface ProductUploadService {
  uploadImage(file: File): Promise<UploadedProductImage>;

  uploadImages(files: File[]): Promise<UploadedProductImage[]>;
}
