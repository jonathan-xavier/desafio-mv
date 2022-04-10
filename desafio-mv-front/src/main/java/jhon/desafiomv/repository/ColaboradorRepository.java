package jhon.desafiomv.repository;


import java.util.List;
import java.util.Optional;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import org.springframework.transaction.annotation.Transactional;

import jhon.desafiomv.model.Colaborador;


public interface ColaboradorRepository extends JpaRepository<Colaborador, String> {

	//query teste
	@Query(value = "SELECT * FROM colaborador where nome = ?1", nativeQuery = true)
	public List<Colaborador> encontrarPorNome(String nome);
	
	//cadastrar  
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO colaborador(cpf,nome) values (?1, ?2)",nativeQuery = true)
	 public void salvar(String cpf, String nome);
	
	
	//listar todos
	@Query(value = "SELECT * from colaborador", nativeQuery = true)
	public List<Colaborador> encontrarTodos();
	
	//listar por id
	
	@Query(value = "SELECT * FROM colaborador where cpf = ?1", nativeQuery = true)
	  Optional<Colaborador> encontrarPorId(String cpf);
	
	
	//update
	//mexer nesse update para fazer um join
	@Modifying
	@Transactional
	@Query(value = "UPDATE colaborador SET nome = ?1", nativeQuery = true)
	public void atualizar(String nome);
	
	//delete
	
	@Modifying
	@Transactional
	@Query(value = "DELETE from colaborador where cpf = ?1",nativeQuery = true)
	public void deletar(String cpf);
	
}
