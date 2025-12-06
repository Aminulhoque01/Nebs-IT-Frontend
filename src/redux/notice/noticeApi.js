import { baseApi } from "../baseApi/baseApi";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotice: builder.query({
      query: ({ page = 1, limit = 10, searchTerm = "", status = "", target = "", employee = "", date = "" }) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);

        if (searchTerm) params.append("searchTerm", searchTerm);
        if (status) params.append("status", status);
        if (target) params.append("target", target);
        if (employee) params.append("employeeId", employee);
        if (date) params.append("publishDate", date);

        return {
          url: `notice/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["notice"],
    }),
  }),
});

export const { useGetAllNoticeQuery } = noticeApi;
