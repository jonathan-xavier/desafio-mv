package jhon.desafiomv.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import jhon.desafiomv.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{

	
	//cadastrar  
		@Modifying
		@Transactional
		@Query(value = "INSERT INTO item(nome) values (?1)",nativeQuery = true)
		 public void salvar(String nome);
		
		
		//listar todos
		@Query(value = "SELECT * from item", nativeQuery = true)
		public List<Item> encontrarTodos();
		
		//listar por id
		
		@Query(value = "SELECT * FROM item where id = ?1", nativeQuery = true)
		public Optional<Item> encontrarPorId(long id);
		
		
		//update
		//mexer nesse update para fazer um join
		@Modifying
		@Transactional
		@Query(value = "UPDATE item SET nome = ?1", nativeQuery = true)
		public void atualizar(String nome);
		
		//delete
		
		@Modifying
		@Transactional
		@Query(value = "DELETE from item where id = ?1", nativeQuery = true)
		public void deletar(long id);
}
