/**
 * AppStore — estado global do app (perfil, disciplinas e atividades).
 * Busca os dados na API ao abrir o app e expõe funções para criar,
 * editar e excluir. As telas acessam tudo com useAppStore().
 */
import { api, type ActivityInput, type PhotoInput } from "@/services/api";
import type { Activity, ActivityStatus, Discipline, Profile } from "@/types";
import { daysFromToday } from "@/utils/date";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type State = {
  profile: Profile;
  disciplines: Discipline[];
  activities: Activity[];
};

type AppStore = State & {
  loaded: boolean;
  error: string | null;
  /** Busca tudo de novo na API (botão "Tentar novamente") */
  reload: () => Promise<void>;
  /** Cria uma atividade na API e adiciona na lista */
  addActivity: (activity: ActivityInput) => Promise<void>;
  /** Salva as alterações de uma atividade */
  updateActivity: (id: string, activity: ActivityInput) => Promise<void>;
  /** Muda o status (pendente, em andamento, concluída) */
  setActivityStatus: (id: string, status: ActivityStatus) => Promise<void>;
  /** Exclui uma atividade */
  removeActivity: (id: string) => Promise<void>;
  /** Salva nome, curso e semestre */
  updateProfile: (profile: Profile) => Promise<void>;
  /** Envia uma nova foto de perfil (substitui a anterior) */
  updateProfilePhoto: (photo: PhotoInput) => Promise<void>;
  /** Remove a foto de perfil */
  removeProfilePhoto: () => Promise<void>;
};

const AppStoreContext = createContext<AppStore | null>(null);

const emptyState: State = {
  profile: { name: "", course: "", semester: "" },
  disciplines: [],
  activities: [],
};

/** Busca tudo na API; devolve o erro em vez de lançar */
async function fetchAppData(): Promise<State | Error> {
  try {
    const [profile, disciplines, activities] = await Promise.all([
      api.getProfile(),
      api.getDisciplines(),
      api.getActivities(),
    ]);
    return { profile: profile ?? emptyState.profile, disciplines, activities };
  } catch (err) {
    return err instanceof Error ? err : new Error("Erro ao carregar dados.");
  }
}

/** Guarda os dados e as funções; envolve o app no layout raiz */
export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(emptyState);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyResult = useCallback((result: State | Error) => {
    if (result instanceof Error) {
      setError(result.message);
    } else {
      setState(result);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchAppData().then(applyResult);
  }, [applyResult]);

  /** Limpa o erro e busca os dados de novo */
  async function reload() {
    setError(null);
    applyResult(await fetchAppData());
  }

  /** Troca uma atividade da lista pela versão que a API devolveu */
  function replaceActivity(updated: Activity) {
    setState((current) => ({
      ...current,
      activities: current.activities.map((activity) =>
        activity.id === updated.id ? updated : activity,
      ),
    }));
  }

  const store: AppStore = {
    ...state,
    loaded,
    error,
    reload,
    addActivity: async (activity) => {
      const created = await api.createActivity(activity);
      setState((current) => ({
        ...current,
        activities: [...current.activities, created],
      }));
    },
    updateActivity: async (id, activity) => {
      replaceActivity(await api.updateActivity(id, activity));
    },
    setActivityStatus: async (id, status) => {
      replaceActivity(await api.setActivityStatus(id, status));
    },
    removeActivity: async (id) => {
      await api.deleteActivity(id);
      setState((current) => ({
        ...current,
        activities: current.activities.filter((activity) => activity.id !== id),
      }));
    },
    updateProfile: async (profile) => {
      const saved = await api.updateProfile(profile);
      setState((current) => ({ ...current, profile: { ...current.profile, ...saved } }));
    },
    updateProfilePhoto: async (photo) => {
      const saved = await api.uploadProfilePhoto(photo);
      setState((current) => ({ ...current, profile: saved }));
    },
    removeProfilePhoto: async () => {
      const saved = await api.removeProfilePhoto();
      setState((current) => ({ ...current, profile: saved }));
    },
  };

  return (
    <AppStoreContext.Provider value={store}>{children}</AppStoreContext.Provider>
  );
}

/** Acessa os dados e funções do AppStore em qualquer tela */
export function useAppStore() {
  const store = useContext(AppStoreContext);
  if (!store) {
    throw new Error("useAppStore deve ser usado dentro de AppStoreProvider");
  }
  return store;
}

/** Mostra a mensagem de erro da API ao usuário */
export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Erro inesperado.";
}

/** true se a atividade ainda não foi concluída */
export function isPending(activity: Activity) {
  return activity.status !== "concluida";
}

/** Ordena pela data de entrega (mais próxima primeiro) */
export function sortByDueDate(a: Activity, b: Activity) {
  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
}

/** Quantas atividades pendentes uma disciplina tem */
export function pendingCountFor(activities: Activity[], disciplineId: string) {
  return activities.filter(
    (activity) => activity.disciplineId === disciplineId && isPending(activity),
  ).length;
}

/** Pendências com entrega nos próximos 7 dias (inclui atrasadas) */
export function pendingThisWeek(activities: Activity[]) {
  return activities.filter(
    (activity) => isPending(activity) && daysFromToday(activity.dueDate) <= 7,
  );
}
