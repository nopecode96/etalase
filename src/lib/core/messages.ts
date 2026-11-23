export const MSG = {
  SUCCESS: {
    CREATED: "Berhasil dibuat.",
    UPDATED: "Perubahan berhasil disimpan.",
    DELETED: "Berhasil dihapus.",
    SAVED: "Data berhasil disimpan.",
    ORDER_PAID: "Pembayaran telah berhasil diverifikasi.",
    PAYOUT_REQUESTED: "Pengajuan penarikan dana berhasil dikirim.",
    ONBOARDING_COMPLETED: "Selamat datang di etalase.online! Toko Anda siap digunakan.",
  },
  ERROR: {
    UNAUTHORIZED: "Silakan masuk terlebih dahulu untuk melanjutkan.",
    FORBIDDEN: "Anda tidak memiliki hak akses untuk tindakan ini.",
    NOT_FOUND: "Data yang diminta tidak ditemukan.",
    SLUG_RESERVED: "Slug ini adalah kata kunci sistem dan tidak dapat digunakan.",
    SLUG_TAKEN: "Nama domain/slug ini sudah digunakan oleh toko lain.",
    TIER_LOCKED: "Fitur ini hanya tersedia untuk pengguna paket PRO atau lebih tinggi.",
    INVALID_INPUT: "Data yang dimasukkan tidak valid. Periksa kembali form Anda.",
    PAYMENT_FAILED: "Proses pembayaran gagal atau kedaluwarsa. Silakan coba kembali.",
    INTERNAL_ERROR: "Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.",
  },
} as const;

export type MessageCode = keyof typeof MSG.SUCCESS | keyof typeof MSG.ERROR;
