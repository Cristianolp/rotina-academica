/**
 * API — todas as chamadas HTTP para o backend (pasta backend/).
 * Cada função corresponde a uma rota da API.
 */
import type { Activity, ActivityStatus, Discipline, Profile } from "@/types";
import Constants from "expo-constants";

/**
 * Endereço da API. Ordem de preferência:
 * 1. EXPO_PUBLIC_API_URL (arquivo .env na raiz do app)
 * 2. IP do computador que roda o `expo start`, na porta 3000
 *    (funciona no celular com Expo Go na mesma rede Wi-Fi)
 * 3. localhost:3000 (web / emulador iOS)
 */
function resolveBaseUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  return `http://${host ?? "localhost"}:3000`;
}

export const API_URL = resolveBaseUrl();

/** Tempo máximo de espera por uma resposta da API (a foto tem mais tempo) */
const TIMEOUT_MS = 10_000;
const PHOTO_TIMEOUT_MS = 60_000;

/** Faz a requisição HTTP e transforma erros da API em mensagens legíveis */
async function request<T>(
  path: string,
  options: RequestInit = {},
  timeoutMs = TIMEOUT_MS,
): Promise<T> {
  // Sem limite, o app ficaria esperando para sempre quando a API não responde
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new Error(
      `Não foi possível conectar à API em ${API_URL}. Verifique se o backend está rodando ` +
        "e se o celular está na mesma rede Wi-Fi do computador.",
    );
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 204) return undefined as T;

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    if (!body?.erro && response.status === 413) {
      throw new Error("A imagem é muito grande para enviar.");
    }
    throw new Error(body?.erro ?? `Erro ${response.status} na API.`);
  }
  return body as T;
}

/** Endereço completo de um arquivo servido pela API (ex.: a foto de perfil) */
export function fileUrl(path: string) {
  return `${API_URL}${path}`;
}

/** Foto enviada para a API */
export type PhotoInput = {
  base64: string;
  mimeType: string;
};

/** Disciplina enviada para a API ao cadastrar */
export type DisciplineInput = Pick<Discipline, "name" | "professor" | "schedule" | "room" | "icon">;

export type ActivityInput = Pick<
  Activity,
  "title" | "disciplineId" | "dueDate" | "priority" | "description"
>;

export const api = {
  /** Perfil do estudante */
  getProfile: () => request<Profile>("/perfil"),
  updateProfile: (profile: Profile) =>
    request<Profile>("/perfil", { method: "PUT", body: JSON.stringify(profile) }),
  uploadProfilePhoto: (photo: PhotoInput) =>
    request<Profile>(
      "/perfil/foto",
      { method: "PUT", body: JSON.stringify(photo) },
      PHOTO_TIMEOUT_MS,
    ),
  removeProfilePhoto: () => request<Profile>("/perfil/foto", { method: "DELETE" }),

  /** Disciplinas: listar as ativas e cadastrar */
  getDisciplines: () => request<Discipline[]>("/disciplinas"),
  createDiscipline: (discipline: DisciplineInput) =>
    request<Discipline>("/disciplinas", {
      method: "POST",
      body: JSON.stringify(discipline),
    }),

  /** Atividades: listar, criar, editar, mudar status e excluir */
  getActivities: () => request<Activity[]>("/atividades"),
  createActivity: (activity: ActivityInput) =>
    request<Activity>("/atividades", {
      method: "POST",
      body: JSON.stringify(activity),
    }),
  updateActivity: (id: string, activity: ActivityInput) =>
    request<Activity>(`/atividades/${id}`, {
      method: "PUT",
      body: JSON.stringify(activity),
    }),
  setActivityStatus: (id: string, status: ActivityStatus) =>
    request<Activity>(`/atividades/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  deleteActivity: (id: string) =>
    request<void>(`/atividades/${id}`, { method: "DELETE" }),
};
