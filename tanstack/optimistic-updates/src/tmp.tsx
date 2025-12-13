{
  mutation.isPending && (
    <div className="animate-pulse">
      <TodoCard>
        {mutation.variables} <span className="text-gray-500">(Adding...)</span>
      </TodoCard>
    </div>
  );
}
{
  mutation.isSuccess && query.isFetching && (
    <TodoCard>
      {mutation.variables} <span>(Added)</span>
    </TodoCard>
  );
}

queryClient.setQueryData(todosQueryOptions().queryKey, (oldData) => {
  if (!oldData) return [todo];
  return [...oldData, todo];
});
