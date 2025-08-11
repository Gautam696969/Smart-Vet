const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: any;
}

export async function graphqlRequest<T = any>(
    method: "POST" | "GET" = "POST",
    query: string,
    variables?: Record<string, any>,
): Promise<GraphQLResponse<T>> {
  let url = GRAPHQL_ENDPOINT;
  let fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Add authorization header if needed
      // "Authorization": `Bearer ${token}`,
    },
  };

  if (method === "GET") {
    const params = new URLSearchParams({
      query,
      ...(variables ? { variables: JSON.stringify(variables) } : {}),
    });
    url += `?${params.toString()}`;
  } else {
    fetchOptions.body = JSON.stringify({ query, variables });
  }

  const response = await fetch(url, fetchOptions);

  return response.json();
}

