import { baseApi } from "../baseApi/baseApi";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotice: builder.query({
      query: ({
        page = 1,
        limit = 10,
        searchTerm = "",
        status = "",
        target = "",
        employee = "",
        date = "",
      }) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);

        if (searchTerm) params.append("searchTerm", searchTerm);
        if (status) params.append("status", status);
        if (target) params.append("target", target);
        if (employee) params.append("employeeId", employee);
        if (date) params.append("publishDate", date);

        return {
          url: `/notices?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["notice"],
    }),
    createNotice: builder.mutation({
      query: (payload) => ({
        url: "/create-notice",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["notice"],
    }),

    singNotice: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["notice"],
    }),

    updatedNotice: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["notice"],
    }),
   toggleStatus: builder.mutation({
      query: (id) => ({
        url: `/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notice"], // optional, remove if you DO NOT want refetch
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          noticeApi.util.updateQueryData("getNotices", undefined, (draft) => {
            const item = draft.data.find((x) => x._id === id);
            if (item) {
              item.status =
                item.status === "Published" ? "Unpublished" : "Published";
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // rollback UI if failed
        }
      },
    })

  }),
});

export const {
  useGetAllNoticeQuery,
  useCreateNoticeMutation,
  useSingNoticeQuery,
  useUpdatedNoticeMutation,
  useToggleStatusMutation
} = noticeApi;
