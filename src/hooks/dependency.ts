import { useContext, useMemo, useCallback } from "react";
import { interfaces } from "inversify";
import { Command, Query } from "@/usecase";
import { InjectContext } from "@/container";

const useInject = <T>(identifier: interfaces.ServiceIdentifier<T>) => {
  const { container } = useContext(InjectContext);
  if (!container) {
    throw new Error("InjectContext not found");
  }

  return useMemo(() => container.get<T>(identifier), [container, identifier]);
};

const useCommand = <I, O = void>(
  identifier: interfaces.ServiceIdentifier<Command<I, O>>,
) => {
  const command = useInject(identifier);
  return useCallback((input: I) => command.execute(input), [command]);
};

const useQuery = <I, O>(
  identifier: interfaces.ServiceIdentifier<Query<I, O>>,
) => {
  const query = useInject(identifier);
  return useCallback((input: I) => query.execute(input), [query]);
};

export { useInject, useCommand, useQuery };
