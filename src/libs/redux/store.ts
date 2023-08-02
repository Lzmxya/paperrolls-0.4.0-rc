import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { inboxReducer } from "@/features/inbox";
import { insightsReducer } from "@/features/insights";
import { searchReducer } from "@/features/search";
import { toastReducer } from "@/features/toast";
import { uploaderReducer } from "@/features/uploader";

export const store = configureStore({
  reducer: {
    inbox: inboxReducer,
    insights: insightsReducer,
    search: searchReducer,
    toast: toastReducer,
    uploader: uploaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // // Ignore these action types
        // ignoredActions: ["your/action/type"],
        // // Ignore these field paths in all actions
        ignoredActionPaths: ["payload"],
        // // Ignore these paths in the state
        ignoredPaths: ["inbox"],
      },
    }),
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
